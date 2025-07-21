import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

// Helper function to check if a booking date/time is in the past
function isPastBooking(dateString: string, timeString: string): boolean {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Create date for comparison
  const bookingDate = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();
  
  return bookingDate < now;
}

// GET: Fetch user's bookings
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

    // Get user from database
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch user's bookings from the bookings collection
    const bookings = await db.collection("bookings").find({
      clerkId: userId
    }).toArray();

    // Format bookings for frontend consumption
    const formattedBookings = bookings.map(booking => {
      const isPast = isPastBooking(booking.date, booking.time);
      
      // Handle both legacy (single service) and new (multiple services) formats
      let services;
      if (booking.services) {
        // New format: multiple services
        services = booking.services;
      } else if (booking.service) {
        // Legacy format: single service - convert to array format
        services = [booking.service];
      } else {
        // Fallback
        services = [{ id: 'unknown', name: 'Unknown Service' }];
      }

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
        if (typeof booking.dateTime === 'string') {
          dateTimeString = new Date(booking.dateTime).toISOString();
        } else {
          dateTimeString = new Date(booking.dateTime).toISOString();
        }
      } else {
        dateTimeString = new Date().toISOString();
      }

      return {
        id: booking._id.toString(),
        services: services, // Always return as array
        service: services[0], // Keep legacy compatibility with first service
        date: booking.date,
        time: booking.time,
        comment: booking.comment || null, // Include comment
        dateTime: dateTimeString,
        referral: booking.referral || null,
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