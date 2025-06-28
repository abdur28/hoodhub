import { auth } from "@clerk/nextjs/server";
import client from "@/lib/mongodb";

/**
 * Check if the current user has admin access
 * @returns Promise<boolean>
 */
export async function checkAdminAccess(): Promise<boolean> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return false;
    }

    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");
    
    const adminUser = await db.collection("users").findOne({ 
      clerkId: userId,
      role: 'admin'
    });
    
    return !!adminUser;
  } catch (error) {
    console.error("Error checking admin access:", error);
    return false;
  }
}

/**
 * Get admin user information
 * @returns Promise<any | null>
 */
export async function getAdminUser() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");
    
    const adminUser = await db.collection("users").findOne({ 
      clerkId: userId,
      role: 'admin'
    });
    
    return adminUser;
  } catch (error) {
    console.error("Error getting admin user:", error);
    return null;
  }
}

/**
 * Admin middleware for API routes
 * @param userId - Clerk user ID
 * @returns Promise<{ isAdmin: boolean, adminUser: any | null }>
 */
export async function validateAdminAccess(userId: string) {
  if (!userId) {
    return { isAdmin: false, adminUser: null };
  }

  try {
    const mongoClient = await client;
    const db = mongoClient.db("hoodhub");
    
    const adminUser = await db.collection("users").findOne({ 
      clerkId: userId,
      role: 'admin'
    });
    
    return { 
      isAdmin: !!adminUser, 
      adminUser 
    };
  } catch (error) {
    console.error("Error validating admin access:", error);
    return { isAdmin: false, adminUser: null };
  }
}