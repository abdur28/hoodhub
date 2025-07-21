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

// GET: Fetch available time slots for specific services on a specific date
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const services = searchParams.get("services");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required", slots: [] },
        { status: 400 }
      );
    }

    if (!services || services.trim() === '') {
      return NextResponse.json(
        { error: "Services parameter is required", slots: [] },
        { status: 400 }
      );
    }

    // Parse selected services
    const selectedServiceIds = services.split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);

    if (selectedServiceIds.length === 0) {
      return NextResponse.json(
        { error: "At least one service must be provided", slots: [] },
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

    // Create available slots array based on service-specific conflicts
    const availableSlots = allTimeSlots.map(time => {
      // Check if any of the selected services are already booked at this time
      const hasConflict = existingBookings.some(booking => {
        if (booking.time !== time) return false;
        
        // Handle both single service (legacy) and multiple services (new) booking formats
        let bookedServices: string[] = [];
        
        if (booking.services && Array.isArray(booking.services)) {
          // New format: multiple services
          bookedServices = booking.services.map((s: any) => s.id);
        } else if (booking.service && booking.service.id) {
          // Legacy format: single service
          bookedServices = [booking.service.id];
        }
        
        // Check if any of the user's selected services conflict with booked services
        const conflict = selectedServiceIds.some(selectedServiceId => 
          bookedServices.includes(selectedServiceId)
        );

        return conflict;
      });

      return {
        time,
        available: !hasConflict
      };
    });

    const response = {
      success: true,
      date: date,
      services: selectedServiceIds,
      slots: availableSlots,
      totalBookings: existingBookings.length
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch available slots",
        slots: [],
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Create a new booking with multiple services
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
    const { services, date, time, comment, referralCode, referralUserEmail } = body;

    // Validate required fields
    if (!services || !Array.isArray(services) || services.length === 0 || !date || !time) {
      return NextResponse.json(
        { error: "Services (array), date, and time are required" },
        { status: 400 }
      );
    }

    // Validate services array structure
    for (const service of services) {
      if (!service.id || !service.name) {
        return NextResponse.json(
          { error: "Each service must have an id and name" },
          { status: 400 }
        );
      }
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

    // Check if any of the selected services are already booked at the same time
    const selectedServiceIds = services.map(s => s.id);
    const existingBooking = await db.collection("bookings").findOne({
      date: date,
      time: time,
      $or: [
        // Check new format (multiple services)
        {
          "services.id": { $in: selectedServiceIds }
        },
        // Check legacy format (single service) 
        {
          "service.id": { $in: selectedServiceIds }
        }
      ]
    });

    if (existingBooking) {
      // Find which specific service(s) are conflicting
      const conflictingServices = [];
      
      if (existingBooking.services) {
        // New format
        const bookedServiceIds = existingBooking.services.map((s: any) => s.id);
        conflictingServices.push(...selectedServiceIds.filter(id => bookedServiceIds.includes(id)));
      } else if (existingBooking.service) {
        // Legacy format
        if (selectedServiceIds.includes(existingBooking.service.id)) {
          conflictingServices.push(existingBooking.service.id);
        }
      }

      const conflictingServiceNames = conflictingServices.map(id => 
        services.find(s => s.id === id)?.name
      ).filter(Boolean);

      return NextResponse.json(
        { 
          error: `The following service(s) are already booked at this time: ${conflictingServiceNames.join(', ')}. Please choose a different time or remove the conflicting services.` 
        },
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

    // Create booking document with multiple services
    const bookingData = {
      userId: user._id,
      clerkId: userId,
      services: services, // New: multiple services
      date: date,
      time: time,
      comment: comment || null, // New: optional comment
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
      services: services, // Store multiple services
      comment: comment || null,
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
              services: services, // Store multiple services
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

    // Create service names string for emails
    const serviceNames = services.map(s => s.name).join(', ');

    // Send booking confirmation email to customer
    try {
      await sendBookingConfirmationEmail(user.email, {
        firstName: user.firstName || 'Valued Customer',
        service: serviceNames, // Multiple services as comma-separated string
        services: services, // Pass services array for new email template
        date: formattedDate,
        time: formattedTime,
        artist: 'Our Expert Team',
        location: 'HoodHub Studio',
        comment: comment || null
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
        service: serviceNames, // Multiple services as comma-separated string
        services: services, // Pass services array for new email template
        date: formattedDate,
        time: formattedTime,
        bookingId: bookingId.toString(),
        comment: comment || null,
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

    // Handle service names for email (support both old and new formats)
    let serviceNames = '';
    let services = null;
    if (booking.services && Array.isArray(booking.services)) {
      // New format: multiple services
      serviceNames = booking.services.map((s: any) => s.name).join(', ');
      services = booking.services;
    } else if (booking.service) {
      // Legacy format: single service
      serviceNames = booking.service.name;
      services = [booking.service];
    }

    // Send booking cancellation email to customer
    try {
      await sendBookingCancellationEmail(user.email, {
        firstName: user.firstName || 'Valued Customer',
        service: serviceNames,
        services: services as any,
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
        service: serviceNames,
        services: services as any,
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