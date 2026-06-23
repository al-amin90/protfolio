import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// deleclaring mongoose variable in global
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
  }
  console.log("MongoDB connected Successfully");

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
