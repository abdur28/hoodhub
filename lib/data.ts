import client from "./mongodb";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
    try {
        const { userId } =await auth();
        if (!userId) return null;
        const mongoClient = await client;
        const db = mongoClient.db("hoodhub");
        const user = await db.collection("users").findOne({ clerkId: userId });
        if (!user) return null;
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};