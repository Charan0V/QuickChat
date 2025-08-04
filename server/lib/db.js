// lib/db.js or db/connectDB.js
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false); // Optional but good practice - KEPT as you had it

        // Add all event listeners BEFORE connecting - KEPT as you had them
        mongoose.connection.on("connected", () => {
            console.log("✅ MongoDB connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB disconnected");
        });

        // Ensure your URI already includes database name OR append it here - KEPT your logic
        const mongoUri = process.env.MONGODB_URI?.includes("mongodb.net")
            ? process.env.MONGODB_URI
            : `${process.env.MONGODB_URI}/chat-app`;

        // FIXED: Removed deprecated options
        await mongoose.connect(mongoUri);
        
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Optional: exit process if DB fails to connect - KEPT as you had it
    }
};
