import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

// GET: Fetch all users for admin management
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

    // Get all users with their bookings count (include admins now)
    const users = await db.collection("users").aggregate([
      // Remove the role filter to include all users including admins
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "userId", 
          as: "bookings"
        }
      },
      {
        $project: {
          _id: 1,
          clerkId: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          profilePicture: 1,
          bookings: { $size: "$bookings" }
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by newest first
      }
    ]).toArray();

    // Format users for response
    const formattedUsers = users.map(user => ({
      _id: user._id.toString(),
      clerkId: user.clerkId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role || 'user',
      createdAt: user.createdAt,
      profilePicture: user.profilePicture,
      bookings: user.bookings
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      totalUsers: formattedUsers.length
    });

  } catch (error) {
    console.error("Error fetching users for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user (admin only)
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
    const userIdToDelete = searchParams.get("id");

    if (!userIdToDelete) {
      return NextResponse.json(
        { error: "User ID is required" },
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

    // Find the user to delete
    const userToDelete = await db.collection("users").findOne({ 
      clerkId: userIdToDelete 
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deleting admin users
    if (userToDelete.role === 'admin') {
      return NextResponse.json(
        { error: "Cannot delete admin users" },
        { status: 403 }
      );
    }

    // Delete user's bookings first
    await db.collection("bookings").deleteMany({ 
      userId: userToDelete._id 
    });

    // Delete the user
    await db.collection("users").deleteOne({ 
      _id: userToDelete._id 
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}