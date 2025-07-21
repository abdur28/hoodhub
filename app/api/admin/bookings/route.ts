import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { 
  sendBookingCancellationEmail,
  sendAdminCancellationNotification
} from "@/lib/email";

// Helper function to format date for display
function formatDateForDisplay(booking: any) {
  let bookingDate: string;
  let bookingTime: string;

  if (booking.date && booking.time) {
    bookingDate = booking.date;
    bookingTime = booking.time;
  } else if (booking.dateTime) {
    const dateTimeString = typeof booking.dateTime === 'string' ? booking.dateTime : booking.dateTime.toISOString();
    const dateParts = dateTimeString.split('T');
    bookingDate = dateParts[0];
    bookingTime = dateParts[1]?.substring(0, 5) || '00:00';
  } else {
    // Fallback
    const now = new Date();
    bookingDate = now.toISOString().split('T')[0];
    bookingTime = '00:00';
  }

  const [year, month, day] = bookingDate.split('-').map(Number);
  const [hours, minutes] = bookingTime.split(':').map(Number);
  
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
  
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
  return { formattedDate, formattedTime };
}

// GET: Fetch all bookings for admin
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Check if user is admin
    const adminUser = await db.collection("users").findOne({ 
      clerkId: userId,
      role: 'admin'
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Fetch all bookings with user information
    const bookings = await db.collection("bookings").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          clerkId: 1,
          services: 1, // New: multiple services
          service: 1,  // Legacy: single service
          date: 1,
          time: 1,
          comment: 1, // New: comment field
          dateTime: 1,
          createdAt: 1,
          referral: 1,
          user: {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            profilePicture: 1
          }
        }
      }
    ]).toArray();

    // Format bookings for response with multiple services support
    const formattedBookings = bookings.map(booking => {
      // Handle dateTime construction
      let dateTimeString: string;
      if (booking.date && booking.time) {
        // Construct from separate date and time fields
        const [year, month, day] = booking.date.split('-').map(Number);
        const [hours, minutes] = booking.time.split(':').map(Number);
        const constructedDate = new Date(year, month - 1, day, hours, minutes);
        dateTimeString = constructedDate.toISOString();
      } else if (booking.dateTime) {
        // Use existing dateTime field
        dateTimeString = typeof booking.dateTime === 'string' 
          ? new Date(booking.dateTime).toISOString()
          : new Date(booking.dateTime).toISOString();
      } else {
        dateTimeString = new Date().toISOString();
      }

      // Handle both new (multiple services) and legacy (single service) formats
      let services;
      if (booking.services && Array.isArray(booking.services)) {
        // New format: multiple services
        services = booking.services;
      } else if (booking.service) {
        // Legacy format: single service - convert to array format
        services = [booking.service];
      } else {
        // Fallback
        services = [{ id: 'unknown', name: 'Unknown Service' }];
      }

      return {
        _id: booking._id.toString(),
        userId: booking.userId,
        clerkId: booking.clerkId,
        services: services, // Always return as array
        service: services[0], // Keep legacy compatibility with first service
        date: booking.date,
        time: booking.time,
        comment: booking.comment || null, // Include comment
        dateTime: dateTimeString,
        createdAt: booking.createdAt,
        referral: booking.referral || null,
        user: booking.user
      };
    });

    // Sort by dateTime, newest first
    formattedBookings.sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({
      success: true,
      bookings: formattedBookings,
      totalBookings: formattedBookings.length
    });

  } catch (error) {
    console.error("Error fetching bookings for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// DELETE: Cancel a booking (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");

    // Check if user is admin
    const adminUser = await db.collection("users").findOne({ 
      clerkId: userId,
      role: 'admin'
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Find the booking to cancel
    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(bookingId)
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Get user info for email
    const user = await db.collection("users").findOne({ 
      _id: booking.userId 
    });

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
        } as any
      }
    );

    // Remove referral tracking if it exists
    if (booking.referral && booking.referral.referralUserId) {
      await db.collection("users").updateOne(
        { _id: new ObjectId(booking.referral.referralUserId) },
        {
          $pull: {
            referrals: { bookingId: new ObjectId(bookingId) }
          } as any
        }
      );
    }

    // Format date and time for emails
    const { formattedDate, formattedTime } = formatDateForDisplay(booking);

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
        services: services as {id: string, name: string}[],
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
        services: services as {id: string, name: string}[],
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