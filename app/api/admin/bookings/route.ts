import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { 
  sendBookingCancellationEmail,
  sendAdminCancellationNotification
} from "@/lib/email";

// Helper function to format date string for display
function formatDateString(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];
  
  // Create date to get day of week (but keep date as string)
  const [y, m, d] = [parseInt(year), parseInt(month) - 1, parseInt(day)];
  const dateObj = new Date(y, m, d);
  const dayOfWeek = dayNames[dateObj.getDay()];
  
  return `${dayOfWeek}, ${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

// Helper function to format time string for display
function formatTimeString(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
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
      // Handle dateTime construction but keep as string
      let dateTimeString: string;
      if (booking.date && booking.time) {
        // Construct ISO-like string but keep it simple
        dateTimeString = `${booking.date}T${booking.time}:00`;
      } else if (booking.dateTime) {
        // Use existing dateTime field as string
        dateTimeString = typeof booking.dateTime === 'string' 
          ? booking.dateTime
          : booking.dateTime.toISOString();
      } else {
        // Fallback to current date/time as string
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
        dateTimeString = `${dateStr}T${timeStr}:00`;
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
        formattedDate: formatDateString(booking.date),
        formattedTime: formatTimeString(booking.time),
        createdAt: booking.createdAt,
        referral: booking.referral || null,
        user: booking.user
      };
    });

    // Sort by date/time (simple string comparison for YYYY-MM-DD format)
    formattedBookings.sort((a, b) => {
      const dateTimeA = `${a.date} ${a.time}`;
      const dateTimeB = `${b.date} ${b.time}`;
      return dateTimeB.localeCompare(dateTimeA); // Newest first
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

    // Format date and time for emails using string functions
    const formattedDate = formatDateString(booking.date);
    const formattedTime = formatTimeString(booking.time);

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