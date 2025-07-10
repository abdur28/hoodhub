import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

// Helper function to check if a booking is in the past
function isPastBooking(booking: any): boolean {
  let bookingDate: Date;
  
  // Handle both new format (separate date/time) and old format (dateTime)
  if (booking.date && booking.time) {
    const [year, month, day] = booking.date.split('-').map(Number);
    const [hours, minutes] = booking.time.split(':').map(Number);
    bookingDate = new Date(year, month - 1, day, hours, minutes);
  } else if (booking.dateTime) {
    // Handle legacy dateTime format
    if (typeof booking.dateTime === 'string') {
      // String format: "2024-03-20T14:30:00"
      const [datePart, timePart] = booking.dateTime.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      bookingDate = new Date(year, month - 1, day, hours, minutes);
    } else {
      // Date object
      bookingDate = new Date(booking.dateTime);
    }
  } else {
    return false;
  }
  
  const now = new Date();
  return bookingDate < now;
}

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

    // Get user's bookings
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch all bookings for the user
    const bookings = await db.collection("bookings").find({
      clerkId: userId
    }).toArray();

    // Format bookings and separate into upcoming and past
    const formattedBookings = bookings.map(booking => {
      const isPast = isPastBooking(booking);
      
      // Ensure dateTime is always present for backward compatibility
      let dateTimeString: string;
      if (booking.date && booking.time) {
        dateTimeString = `${booking.date}T${booking.time}:00`;
      } else if (booking.dateTime) {
        if (typeof booking.dateTime === 'string') {
          dateTimeString = booking.dateTime;
        } else {
          // Convert Date object to ISO string
          dateTimeString = new Date(booking.dateTime).toISOString();
        }
      } else {
        dateTimeString = new Date().toISOString();
      }

      return {
        id: booking._id.toString(),
        service: booking.service,
        date: booking.date,
        time: booking.time,
        dateTime: dateTimeString,
        createdAt: booking.createdAt,
        isPast: isPast
      };
    });

    // Sort bookings by date/time
    formattedBookings.sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });

    // Separate into upcoming and past
    const upcomingBookings = formattedBookings.filter(booking => !booking.isPast);
    const pastBookings = formattedBookings.filter(booking => booking.isPast);

    return NextResponse.json({
      success: true,
      bookings: {
        upcoming: upcomingBookings,
        past: pastBookings,
        all: formattedBookings
      },
      totalBookings: formattedBookings.length
    });

  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}