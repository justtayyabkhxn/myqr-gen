import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL || "";

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is missing");
}

// Extend global object safely for TypeScript
declare global {
  namespace NodeJS {
    interface Global {
      mongooseGlobal?: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

// Ensure global object exists
const globalWithMongoose = global as typeof global & {
  mongooseGlobal: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
};

// Ensure mongooseGlobal is always initialized
if (!globalWithMongoose.mongooseGlobal) {
  globalWithMongoose.mongooseGlobal = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Connection> {
  if (globalWithMongoose.mongooseGlobal.conn) {
    console.log("Using existing MongoDB connection.");
    return globalWithMongoose.mongooseGlobal.conn;
  }

  if (!globalWithMongoose.mongooseGlobal.promise) {
    console.log("Creating new MongoDB connection...");
    globalWithMongoose.mongooseGlobal.promise = mongoose
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

  globalWithMongoose.mongooseGlobal.conn =
    await globalWithMongoose.mongooseGlobal.promise;
  return globalWithMongoose.mongooseGlobal.conn;
}

export default connectDB;
