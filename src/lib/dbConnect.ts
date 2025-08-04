import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

declare global {
  var mongoose:
    | {
        conn: Connection | null;
        promise: Promise<Connection> | null;
      }
  
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// MongoDB connection options for better performance and reliability
const options = {
  bufferCommands: false, // Disable command buffering
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

async function dbConnect(): Promise<Connection> {
  // If we have a cached connection, return it
  if (cached?.conn) {
    console.log("🔄 Using cached database connection");
    return cached.conn;
  }

  // If we don't have a cached connection, but we have a promise, wait for it
  if (!cached?.promise) {
    console.log("🔌 Creating new database connection...");

    cached.promise = mongoose
      .connect(MONGO_URI, options)
      .then((mongooseInstance) => {
        console.log("✅ Database connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error("❌ Database connection failed:", error);
        // Reset the promise so we can try again
        if (cached) {
          cached.promise = null;
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;

    // Set up connection event listeners if not already set
    if (!cached.conn.listeners("error").length) {
      cached.conn.on("error", (error) => {
        console.error("❌ MongoDB connection error:", error);
      });

      cached.conn.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected");
      });

      cached.conn.on("reconnected", () => {
        console.log("🔄 MongoDB reconnected");
      });
    }

    return cached.conn;
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    // Reset cache on error
    if (cached) {
      cached.conn = null;
      cached.promise = null;
    }
    throw error;
  }
}

// Graceful shutdown function
export const disconnectDB = async (): Promise<void> => {
  if (cached?.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 Database disconnected");
  }
};

// Health check function
export const isDBConnected = (): boolean => {
  return cached?.conn?.readyState === 1;
};

// Get connection status
export const getDBStatus = (): string => {
  if (!cached?.conn) return "disconnected";

  switch (cached.conn.readyState) {
    case 0:
      return "disconnected";
    case 1:
      return "connected";
    case 2:
      return "connecting";
    case 3:
      return "disconnecting";
    default:
      return "unknown";
  }
};

export default dbConnect;
