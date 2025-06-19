import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch available time slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const service = searchParams.get("service");

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

    // Parse date and create range for the day
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch existing bookings for the selected date
    const existingBookings = await db.collection("bookings").find({
      dateTime: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).toArray();

    // Extract booked times
    const bookedTimes = existingBookings.map(booking => {
      const bookingDate = new Date(booking.dateTime);
      return `${bookingDate.getHours().toString().padStart(2, '0')}:${bookingDate.getMinutes().toString().padStart(2, '0')}`;
    });

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
    const { service, date, time } = body;

    // Validate required fields
    if (!service || !date || !time) {
      return NextResponse.json(
        { error: "Service, date, and time are required" },
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

    // Create dateTime from date and time
    const [hours, minutes] = time.split(':');
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Check if the slot is already booked
    const existingBooking = await db.collection("bookings").findOne({
      dateTime: dateTime
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create booking document
    const bookingData = {
      userId: user._id,
      clerkId: userId,
      service: service,
      dateTime: dateTime,
      createdAt: new Date()
    };

    // Insert booking
    const result = await db.collection("bookings").insertOne(bookingData);
    const bookingId = result.insertedId;

    // Add booking reference to user document
    const bookingRef = {
      id: bookingId,
      dateTime: dateTime,
      service: service,
      createdAt: new Date()
    };

    await db.collection("users").updateOne(
      { _id: user._id },
      { 
        $push: { 
          bookings: bookingRef 
        } as any 
      }
    );

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

    // Find the booking
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