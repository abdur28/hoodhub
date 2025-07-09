// app/api/admin/users/referral/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Generate a unique referral code
function generateReferralCode(firstName: string, lastName: string): string {
  // Use characters that are easy to read and type (excluding confusing ones like 0, O, I, l)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  
  // Generate 10 more characters to make a total of 12 characters
  let randomPart = '';
  for (let i = 0; i < 10; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return initials + randomPart;
}

// POST: Generate referral code for a user (admin only)
export async function POST(request: NextRequest) {
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
    const { targetUserId } = body;

    // Validate required fields
    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID is required" },
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

    // Check if user already has a referral code
    if (targetUser.referralCode) {
      return NextResponse.json({
        success: true,
        referralCode: targetUser.referralCode,
        message: "User already has a referral code"
      });
    }

    // Generate a unique referral code
    let referralCode: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      referralCode = generateReferralCode(
        targetUser.firstName || 'User',
        targetUser.lastName || 'HoodHub'
      );
      
      // Check if this code already exists
      const existingCode = await db.collection("users").findOne({ 
        referralCode: referralCode 
      });
      
      if (!existingCode) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: "Failed to generate unique referral code" },
        { status: 500 }
      );
    }

    // Update the user with the referral code
    await db.collection("users").updateOne(
      { _id: new ObjectId(targetUserId) },
      { 
        $set: { 
          referralCode: referralCode!,
          referralCodeGeneratedAt: new Date(),
          referralCodeGeneratedBy: adminUser._id
        } 
      }
    );

    return NextResponse.json({
      success: true,
      referralCode: referralCode!,
      message: "Referral code generated successfully"
    });

  } catch (error) {
    console.error("Error generating referral code:", error);
    return NextResponse.json(
      { error: "Failed to generate referral code" },
      { status: 500 }
    );
  }
}

// GET: Get user's referral information (admin only)
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

    const searchParams = request.nextUrl.searchParams;
    const targetUserId = searchParams.get("userId");

    if (!targetUserId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the target user with referral information
    const targetUser = await db.collection("users").findOne({ 
      _id: new ObjectId(targetUserId) 
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get referral statistics
    const referralCount = await db.collection("users").countDocuments({
      "referrals.referredUserEmail": targetUser.email
    });

    const referralBookings = await db.collection("bookings").countDocuments({
      "referral.referralUserEmail": targetUser.email
    });

    // Get user's own bookings count  
    const userBookingsCount = await db.collection("bookings").countDocuments({
      userId: targetUser._id
    });

    return NextResponse.json({
      success: true,
      user: {
        _id: targetUser._id,
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        email: targetUser.email,
        role: targetUser.role,
        createdAt: targetUser.createdAt,
        profilePicture: targetUser.profilePicture,
        referralCode: targetUser.referralCode || null,
        referralCodeGeneratedAt: targetUser.referralCodeGeneratedAt || null,
        referralCount: referralCount,
        referralBookings: referralBookings,
        bookings: userBookingsCount
      }
    });

  } catch (error) {
    console.error("Error getting referral information:", error);
    return NextResponse.json(
      { error: "Failed to get referral information" },
      { status: 500 }
    );
  }
}