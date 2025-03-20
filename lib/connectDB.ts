import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";

async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

export default connectDB;
