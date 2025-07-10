import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId, PushOperator } from "mongodb";
import { 
  sendBookingConfirmationEmail, 
  sendBookingCancellationEmail,
  sendAdminBookingNotification,
  sendAdminCancellationNotification
} from "@/lib/email";

// Helper function to check if a booking date/time is in the past
function isPastBooking(dateString: string, timeString: string): boolean {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Create date for comparison
  const bookingDate = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();
  
  return bookingDate < now;
}

// Helper function to format date for display
function formatDateForDisplay(dateString: string, timeString: string, locale: string = 'en-US') {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  
  const date = new Date(year, month - 1, day, hours, minutes);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  const formattedDate = date.toLocaleDateString(locale, dateOptions);
  const formattedTime = date.toLocaleTimeString(locale, timeOptions);
  
  return { formattedDate, formattedTime };
}

// GET: Fetch available time slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Define all possible time slots
    const allTimeSlots = [
      "10:00", "11:00", "12:00", "13:00", "14:00", 
      "15:00", "16:00", "17:00", "18:00", "19:00", 
      "20:00", "21:00"
    ];

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Fetch existing bookings for the selected date
    const existingBookings = await db.collection("bookings").find({
      date: date
    }).toArray();

    // Extract booked times
    const bookedTimes = existingBookings.map(booking => booking.time);

    // Create available slots array
    const availableSlots = allTimeSlots.map(time => ({
      time,
      available: !bookedTimes.includes(time)
    }));

    return NextResponse.json({
      date: date,
      slots: availableSlots,
      totalBookings: existingBookings.length
    });

  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}

// POST: Create a new booking
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { service, date, time, referralCode, referralUserEmail } = body;

    // Validate required fields
    if (!service || !service.id || !service.name || !date || !time) {
      return NextResponse.json(
        { error: "Service (with id and name), date, and time are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Get user from database
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if the slot is already booked
    const existingBooking = await db.collection("bookings").findOne({
      date: date,
      time: time
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Validate referral code if provided
    let referralData = null;
    if (referralCode && referralCode.trim()) {
      const referralUser = await db.collection("users").findOne({ 
        referralCode: referralCode.trim().toUpperCase() 
      });
      
      if (referralUser) {
        referralData = {
          referralCode: referralCode.trim().toUpperCase(),
          referralUserEmail: referralUser.email,
          referralUserName: `${referralUser.firstName} ${referralUser.lastName}`,
          referralUserId: referralUser._id
        };
      }
    }

    // Create booking document with separate date and time fields
    const bookingData = {
      userId: user._id,
      clerkId: userId,
      service: service,
      date: date,
      time: time,
      // Keep dateTime for backward compatibility but as a simple string
      dateTime: `${date}T${time}:00`,
      referral: referralData,
      createdAt: new Date()
    };

    // Insert booking
    const result = await db.collection("bookings").insertOne(bookingData);
    const bookingId = result.insertedId;

    // Add booking reference to user document
    const bookingRef = {
      id: bookingId,
      date: date,
      time: time,
      dateTime: `${date}T${time}:00`,
      service: service,
      referral: referralData,
      createdAt: new Date()
    };

    await db.collection("users").updateOne(
      { _id: user._id },
      { 
        $push: { 
          bookings: bookingRef 
        } as PushOperator<Document>
      }
    );

    // If there's a referral, track it for the referring user
    if (referralData) {
      await db.collection("users").updateOne(
        { _id: referralData.referralUserId },
        {
          $push: {
            referrals: {
              bookingId: bookingId,
              referredUserEmail: user.email,
              referredUserName: `${user.firstName} ${user.lastName}`,
              service: service,
              date: date,
              time: time,
              dateTime: `${date}T${time}:00`,
              createdAt: new Date()
            }
          } as PushOperator<Document>
        }
      );
    }

    // Format date and time for emails
    const { formattedDate, formattedTime } = formatDateForDisplay(date, time);

    // Send booking confirmation email to customer
    try {
      await sendBookingConfirmationEmail(user.email, {
        firstName: user.firstName || 'Valued Customer',
        service: service.name,
        date: formattedDate,
        time: formattedTime,
        artist: 'Our Expert Team',
        location: 'HoodHub Studio'
      });
      
      console.log(`Booking confirmation email sent to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send booking confirmation email:', emailError);
      // Don't fail the booking creation if email fails
    }

    // Send admin notification email
    try {
      await sendAdminBookingNotification({
        customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Customer',
        customerEmail: user.email,
        service: service.name,
        date: formattedDate,
        time: formattedTime,
        bookingId: bookingId.toString(),
        referralCode: referralData?.referralCode || null,
        referralUserEmail: referralData?.referralUserEmail || null
      });
      
      console.log(`Admin booking notification sent to contact@hoodhub.ru`);
    } catch (adminEmailError) {
      console.error('Failed to send admin booking notification:', adminEmailError);
      // Don't fail the booking creation if admin email fails
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: bookingId,
        ...bookingData
      }
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// DELETE: Cancel a booking
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Find the booking and get user info for email
    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(bookingId),
      clerkId: userId
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or unauthorized" },
        { status: 404 }
      );
    }

    // Get user info for email
    const user = await db.collection("users").findOne({ _id: booking.userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete the booking
    await db.collection("bookings").deleteOne({
      _id: new ObjectId(bookingId)
    });

    // Remove booking reference from user document
    await db.collection("users").updateOne(
      { _id: booking.userId },
      { 
        $pull: { 
          bookings: { id: new ObjectId(bookingId) } 
        } as PushOperator<Document>
      }
    );

    // Remove referral tracking if it exists
    if (booking.referral) {
      await db.collection("users").updateOne(
        { _id: booking.referral.referralUserId },
        {
          $pull: {
            referrals: { bookingId: new ObjectId(bookingId) }
          } as PushOperator<Document>
        }
      );
    }

    // Format date and time for emails
    const bookingDate = booking.date || booking.dateTime.split('T')[0];
    const bookingTime = booking.time || booking.dateTime.split('T')[1].substring(0, 5);
    const { formattedDate, formattedTime } = formatDateForDisplay(bookingDate, bookingTime);

    // Send booking cancellation email to customer
    try {
      await sendBookingCancellationEmail(user.email, {
        firstName: user.firstName || 'Valued Customer',
        service: booking.service.name,
        date: formattedDate,
        time: formattedTime
      });
      
      console.log(`Booking cancellation email sent to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send booking cancellation email:', emailError);
      // Don't fail the cancellation if email fails
    }

    // Send admin cancellation notification email
    try {
      await sendAdminCancellationNotification({
        customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Customer',
        customerEmail: user.email,
        service: booking.service.name,
        date: formattedDate,
        time: formattedTime,
        bookingId: bookingId
      });
      
      console.log(`Admin cancellation notification sent to contact@hoodhub.ru`);
    } catch (adminEmailError) {
      console.error('Failed to send admin cancellation notification:', adminEmailError);
      // Don't fail the cancellation if admin email fails
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}