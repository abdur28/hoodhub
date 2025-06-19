import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all bookings for the current user
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

    // Fetch all bookings for this user
    const bookings = await db.collection("bookings")
      .find({ userId: user._id })
      .sort({ dateTime: -1 }) // Sort by date, newest first
      .toArray();

    // Format bookings for response
    const formattedBookings = bookings.map(booking => ({
      id: booking._id.toString(),
      service: booking.service,
      dateTime: booking.dateTime,
      createdAt: booking.createdAt,
      isPast: new Date(booking.dateTime) < new Date()
    }));

    // Separate upcoming and past bookings
    const upcomingBookings = formattedBookings.filter(b => !b.isPast);
    const pastBookings = formattedBookings.filter(b => b.isPast);

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