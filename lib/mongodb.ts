import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL || "";
console.log("MONGODB_URI:", MONGODB_URL);
interface MongooseGlobal {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Ensure a single database connection (prevents multiple connections in dev mode)
declare global {
  var mongooseGlobal: MongooseGlobal;
}

global.mongooseGlobal = global.mongooseGlobal || { conn: null, promise: null };

async function connectDB(): Promise<mongoose.Connection> {
  if (global.mongooseGlobal.conn) return global.mongooseGlobal.conn;

  if (!global.mongooseGlobal.promise) {
    global.mongooseGlobal.promise = mongoose.connect(MONGODB_URL, {}).then((mongoose) => mongoose.connection);
  }

  global.mongooseGlobal.conn = await global.mongooseGlobal.promise;
  return global.mongooseGlobal.conn;
}

export default connectDB;
