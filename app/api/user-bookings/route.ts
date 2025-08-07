import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

// Helper function to check if a booking date/time is in the past
function isPastBooking(dateString: string, timeString: string): boolean {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Create date for comparison (this will be in local timezone)
  const bookingDate = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();
  
  return bookingDate < now;
}

// Helper function to format date string for display
function formatDateString(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

// Helper function to format time string for display
function formatTimeString(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
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

      // Keep datetime as string for consistency, but construct it properly
      let dateTimeString: string;
      if (booking.date && booking.time) {
        // Construct ISO-like string but keep it simple
        dateTimeString = `${booking.date}T${booking.time}:00`;
      } else if (booking.dateTime) {
        // Use existing dateTime field as string
        dateTimeString = booking.dateTime;
      } else {
        // Fallback to current date/time as string
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
        dateTimeString = `${dateStr}T${timeStr}:00`;
      }

      return {
        id: booking._id.toString(),
        services: services, // Always return as array
        service: services[0], // Keep legacy compatibility with first service
        date: booking.date,
        time: booking.time,
        comment: booking.comment || null,
        dateTime: dateTimeString,
        formattedDate: formatDateString(booking.date),
        formattedTime: formatTimeString(booking.time),
        referral: booking.referral || null,
        createdAt: booking.createdAt,
        isPast: isPast
      };
    });

    // Sort bookings by date/time (simple string comparison for YYYY-MM-DD format)
    formattedBookings.sort((a, b) => {
      const dateTimeA = `${a.date} ${a.time}`;
      const dateTimeB = `${b.date} ${b.time}`;
      return dateTimeB.localeCompare(dateTimeA); // Newest first
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