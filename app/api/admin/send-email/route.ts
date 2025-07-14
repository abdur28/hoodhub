// app/api/admin/send-email/route.ts - Updated to include subscribers
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendAdminCustomEmail } from "@/lib/email";

// POST: Send custom email to user(s) and/or subscribers
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
    const { 
      recipients, 
      subject, 
      message, 
      sendToAll, 
      includeSubscribers,
      subscriberRecipients,
      sendToAllSubscribers 
    } = body;

    // Validate required fields
    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 }
      );
    }

    if (!sendToAll && !sendToAllSubscribers && 
        (!recipients || recipients.length === 0) && 
        (!subscriberRecipients || subscriberRecipients.length === 0)) {
      return NextResponse.json(
        { error: "Recipients are required when not sending to all users or subscribers" },
        { status: 400 }
      );
    }

    let emailResults = [];
    
    // Send to users
    if (sendToAll || (recipients && recipients.length > 0)) {
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
              type: 'user',
              success: success
            });
          } catch (error) {
            console.error(`Failed to send email to ${user.email}:`, error);
            emailResults.push({
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              type: 'user',
              success: false
            });
          }
        }
      } else {
        // Send to specific user recipients
        for (const recipientId of recipients) {
          try {
            const user = await db.collection("users").findOne({ 
              _id: new ObjectId(recipientId) 
            });
            
            if (!user) {
              emailResults.push({
                id: recipientId,
                type: 'user',
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
              type: 'user',
              success: success
            });
          } catch (error) {
            console.error(`Failed to send email to recipient ${recipientId}:`, error);
            emailResults.push({
              id: recipientId,
              type: 'user',
              success: false,
            });
          }
        }
      }
    }

    // Send to subscribers
    if (sendToAllSubscribers || (subscriberRecipients && subscriberRecipients.length > 0)) {
      if (sendToAllSubscribers) {
        // Send to all active subscribers
        const allSubscribers = await db.collection("subscribers").find({ 
          status: 'active'
        }).toArray();

        for (const subscriber of allSubscribers) {
          try {
            const success = await sendAdminCustomEmail(
              subscriber.email,
              subject,
              message,
              undefined // No first name for subscribers
            );
            
            emailResults.push({
              email: subscriber.email,
              name: subscriber.email, // Use email as name for subscribers
              type: 'subscriber',
              success: success
            });
          } catch (error) {
            console.error(`Failed to send email to ${subscriber.email}:`, error);
            emailResults.push({
              email: subscriber.email,
              name: subscriber.email,
              type: 'subscriber',
              success: false
            });
          }
        }
      } else {
        // Send to specific subscriber recipients
        for (const subscriberId of subscriberRecipients) {
          try {
            const subscriber = await db.collection("subscribers").findOne({ 
              _id: new ObjectId(subscriberId),
              status: 'active'
            });
            
            if (!subscriber) {
              emailResults.push({
                id: subscriberId,
                type: 'subscriber',
                success: false,
                error: 'Subscriber not found'
              });
              continue;
            }

            const success = await sendAdminCustomEmail(
              subscriber.email,
              subject,
              message,
              undefined // No first name for subscribers
            );
            
            emailResults.push({
              email: subscriber.email,
              name: subscriber.email,
              type: 'subscriber',
              success: success
            });
          } catch (error) {
            console.error(`Failed to send email to subscriber ${subscriberId}:`, error);
            emailResults.push({
              id: subscriberId,
              type: 'subscriber',
              success: false,
            });
          }
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
      sendToAllSubscribers: sendToAllSubscribers,
      recipients: sendToAll ? 'all_users' : recipients,
      subscriberRecipients: sendToAllSubscribers ? 'all_subscribers' : subscriberRecipients,
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

// GET: Get all users and subscribers for admin email selection
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

    // Get all active subscribers
    const subscribers = await db.collection("subscribers").find({ 
      status: 'active'
    }).project({
      _id: 1,
      email: 1,
      subscribedAt: 1
    }).sort({ email: 1 }).toArray();

    // Format users for response
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinedDate: user.createdAt
    }));

    // Format subscribers for response
    const formattedSubscribers = subscribers.map(subscriber => ({
      id: subscriber._id.toString(),
      name: subscriber.email,
      email: subscriber.email,
      joinedDate: subscriber.subscribedAt
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      subscribers: formattedSubscribers,
      totalUsers: formattedUsers.length,
      totalSubscribers: formattedSubscribers.length
    });

  } catch (error) {
    console.error("Error fetching users and subscribers for admin email:", error);
    return NextResponse.json(
      { error: "Failed to fetch users and subscribers" },
      { status: 500 }
    );
  }
}