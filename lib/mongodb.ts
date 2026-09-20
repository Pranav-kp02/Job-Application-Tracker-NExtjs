import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cache = (global as any).mongoose;

if (!cache) {
  cache = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cache.conn) {
    console.log("MongoDB already connected");
    return cache.conn;
  }

  if (!cache.promise) {
    console.log("Connecting to MongoDB...");
    cache.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cache.conn = await cache.promise;
    console.log("MongoDB connected successfully");
    return cache.conn;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
