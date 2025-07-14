// app/api/admin/subscribers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all subscribers for admin management
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

    // Get all subscribers
    const subscribers = await db.collection("subscribers").find({
      status: 'active'
    }).sort({ subscribedAt: -1 }).toArray();

    // Format subscribers for response
    const formattedSubscribers = subscribers.map(subscriber => ({
      _id: subscriber._id.toString(),
      email: subscriber.email,
      subscribedAt: subscriber.subscribedAt,
      status: subscriber.status
    }));

    return NextResponse.json({
      success: true,
      subscribers: formattedSubscribers,
      totalSubscribers: formattedSubscribers.length
    });

  } catch (error) {
    console.error("Error fetching subscribers for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a subscriber (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const subscriberId = searchParams.get("id");

    if (!subscriberId) {
      return NextResponse.json(
        { error: "Subscriber ID is required" },
        { status: 400 }
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

    // Find the subscriber to delete
    const subscriber = await db.collection("subscribers").findOne({ 
      _id: new ObjectId(subscriberId) 
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    // Mark subscriber as unsubscribed instead of deleting
    await db.collection("subscribers").deleteOne(
      { _id: new ObjectId(subscriberId) }
    );

    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully"
    });

  } catch (error) {
    console.error("Error removing subscriber:", error);
    return NextResponse.json(
      { error: "Failed to remove subscriber" },
      { status: 500 }
    );
  }
}