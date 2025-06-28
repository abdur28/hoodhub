import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendAdminCustomEmail } from "@/lib/email";

// POST: Send custom email to user(s)
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
    const { recipients, subject, message, sendToAll } = body;

    // Validate required fields
    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 }
      );
    }

    if (!sendToAll && (!recipients || recipients.length === 0)) {
      return NextResponse.json(
        { error: "Recipients are required when not sending to all users" },
        { status: 400 }
      );
    }

    let emailResults = [];
    
    if (sendToAll) {
      // Send to all users
      const allUsers = await db.collection("users").find({ 
        role: { $ne: 'admin' } // Don't send to other admins
      }).toArray();

      for (const user of allUsers) {
        try {
          const success = await sendAdminCustomEmail(
            user.email,
            subject,
            message,
            user.firstName
          );
          
          emailResults.push({
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            success: success
          });
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
          emailResults.push({
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            success: false
          });
        }
      }
    } else {
      // Send to specific recipients
      for (const recipientId of recipients) {
        try {
          const user = await db.collection("users").findOne({ 
            _id: new ObjectId(recipientId) 
          });
          
          if (!user) {
            emailResults.push({
              id: recipientId,
              success: false,
              error: 'User not found'
            });
            continue;
          }

          const success = await sendAdminCustomEmail(
            user.email,
            subject,
            message,
            user.firstName
          );
          
          emailResults.push({
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            success: success
          });
        } catch (error) {
          console.error(`Failed to send email to recipient ${recipientId}:`, error);
          emailResults.push({
            id: recipientId,
            success: false,
            error: error.message
          });
        }
      }
    }

    // Calculate success rate
    const successCount = emailResults.filter(result => result.success).length;
    const totalCount = emailResults.length;

    // Log the email campaign
    await db.collection("email_campaigns").insertOne({
      adminId: adminUser._id,
      subject: subject,
      message: message,
      sendToAll: sendToAll,
      recipients: sendToAll ? 'all_users' : recipients,
      results: emailResults,
      successCount: successCount,
      totalCount: totalCount,
      sentAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: `Email campaign completed. ${successCount}/${totalCount} emails sent successfully.`,
      results: {
        successCount,
        totalCount,
        details: emailResults
      }
    });

  } catch (error) {
    console.error("Error sending admin emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}

// GET: Get all users for admin email selection
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

    // Get all non-admin users
    const users = await db.collection("users").find({ 
      role: { $ne: 'admin' }
    }).project({
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      createdAt: 1
    }).sort({ firstName: 1 }).toArray();

    // Format users for response
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinedDate: user.createdAt
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      totalUsers: formattedUsers.length
    });

  } catch (error) {
    console.error("Error fetching users for admin email:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}