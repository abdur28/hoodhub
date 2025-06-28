import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT: Update user role (admin only)
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { userId: targetUserId, newRole } = body;

    // Validate required fields
    if (!targetUserId || !newRole) {
      return NextResponse.json(
        { error: "User ID and new role are required" },
        { status: 400 }
      );
    }

    // Validate role
    if (!['user', 'admin'].includes(newRole)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'user' or 'admin'" },
        { status: 400 }
      );
    }

    // Find the target user
    const targetUser = await db.collection("users").findOne({ 
      _id: new ObjectId(targetUserId) 
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent admin from demoting themselves
    if (targetUser.clerkId === userId && newRole !== 'admin') {
      return NextResponse.json(
        { error: "Cannot demote yourself from admin role" },
        { status: 403 }
      );
    }

    // Update the user's role
    await db.collection("users").updateOne(
      { _id: new ObjectId(targetUserId) },
      { $set: { role: newRole } }
    );

    return NextResponse.json({
      success: true,
      message: `User role updated to ${newRole} successfully`,
      user: {
        _id: targetUserId,
        role: newRole
      }
    });

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}