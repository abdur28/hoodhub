// app/api/user/check-completed-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

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

    // Check if user has phone number (profile completed)
    const user = await db.collection("users").findOne(
      { clerkId: userId },
      { projection: { phoneNumber: 1 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if profile is completed (has phone number)
    const isCompleted = !!user.phoneNumber;

    return NextResponse.json({
      success: true,
      isCompleted
    });

  } catch (error) {
    console.error("Error checking profile completion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}