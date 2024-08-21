import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

// Declare a global variable for the MongoDB client promise in development mode
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

clientPromise = MongoClient.connect(uri);

export async function connectToDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('mydatabase'); // Replace 'mydatabase' with your actual database name
}
