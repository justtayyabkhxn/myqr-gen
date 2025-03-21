import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL || "";

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is missing");
}

// Extend global object safely for TypeScript
declare global {
  var mongooseGlobal: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Ensure global object exists
global.mongooseGlobal = global.mongooseGlobal || { conn: null, promise: null };

async function connectDB(): Promise<mongoose.Connection> {
  if (global.mongooseGlobal.conn) {
    console.log("Using existing MongoDB connection.");
    return global.mongooseGlobal.conn;
  }

  if (!global.mongooseGlobal.promise) {
    console.log("Creating new MongoDB connection...");
    global.mongooseGlobal.promise = mongoose
      .connect(MONGODB_URL, {
        serverSelectionTimeoutMS: 5000, // Set timeout
      })
      .then((mongoose) => {
        console.log("MongoDB connected successfully.");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  global.mongooseGlobal.conn = await global.mongooseGlobal.promise;
  return global.mongooseGlobal.conn;
}

export default connectDB;
