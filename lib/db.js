// lib/db.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: process.env.DB_NAME || "myWebsiteDB",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;

        if (process.env.NODE_ENV !== "production") {
            console.log("✅ MongoDB connected");
        }

        return cached.conn;
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        throw new Error("Database connection failed");
    }
}
