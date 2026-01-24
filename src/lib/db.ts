import mongoose from "mongoose";

//   *Validate required environment variables
//   *App start hote hi error throw ho jayega agar env missing ho
if (!process.env.MONGODB_URL || !process.env.DB_NAME) {
    throw new Error("MongoDB environment variables are missing");
}

// *MongoDB connection URL
const mongoDbUrl = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
if(!mongoDbUrl) {
    throw new Error("DB error")
}

//  * Global cache to prevent multiple DB connections
//  * (Next.js hot reload & serverless issue fix)
let cached = global.mongoose
if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

//  * Connect to MongoDB using cached connection
const connectDb = async()=>{

    // Return existing connection if already connected
    if(cached.conn) {
        return cached.conn
    }

    // Create new connection only once
    if(!cached.promise) {
        cached.promise = mongoose.connect(mongoDbUrl)
        .then((conn)=>conn.connection)
    }

    try {
        // Await connection and cache it
        const conn = await cached.promise
        return conn
    } 
    catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export default connectDb