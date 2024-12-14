// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function connectToMongoDB() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    // Log message indicating a new MongoDB connection is established
    console.log("New mongodb connection established");
    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs during connection, log the error and throw it
    console.log(error);
    throw error;
  }
}


import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const uri = process.env.MONGODB_URI as string; 
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();

    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable to preserve the value
      // across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise.
// By doing this in a separate module, 
// the client can be shared across functions.
export default clientPromise;