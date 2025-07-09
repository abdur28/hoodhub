import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendBookingCancellationEmail } from "@/lib/email";

// GET: Fetch all bookings for admin management
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

    // Get all bookings with user information
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
          service: 1,
          dateTime: 1,
          createdAt: 1,
          referral: 1, // Include referral information
          user: {
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            email: "$user.email",
            profilePicture: "$user.profilePicture"
          }
        }
      },
      {
        $sort: { dateTime: -1 } // Sort by date, newest first
      }
    ]).toArray();

    // Format bookings for response
    const formattedBookings = bookings.map(booking => ({
      _id: booking._id.toString(),
      userId: booking.userId.toString(),
      clerkId: booking.clerkId,
      service: booking.service,
      dateTime: booking.dateTime,
      createdAt: booking.createdAt,
      referral: booking.referral || null, // Include referral data
      user: booking.user
    }));

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
    const formatDateTimeForEmail = (dateTime: Date) => {
      const options: Intl.DateTimeFormatOptions = {
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
      
      const formattedDate = dateTime.toLocaleDateString('en-US', options);
      const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);
      
      return { formattedDate, formattedTime };
    };

    const { formattedDate, formattedTime } = formatDateTimeForEmail(new Date(booking.dateTime));

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