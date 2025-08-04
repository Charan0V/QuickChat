import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false); // Optional but good practice

        // Add all event listeners BEFORE connecting
        mongoose.connection.on("connected", () => {
            console.log("✅ MongoDB connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB disconnected");
        });

        // Ensure your URI already includes database name OR append it here
        const mongoUri = process.env.MONGODB_URI?.includes("mongodb.net")
            ? process.env.MONGODB_URI
            : `${process.env.MONGODB_URI}/chat-app`;

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Optional: exit process if DB fails to connect
    }
};
