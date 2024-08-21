import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs'; // For comparing hashed passwords
import { MongoClient } from 'mongodb'; // MongoDB client
import { connectToDatabase } from '@/lib/mongodb';

// Database connection URI
const uri = process.env.MONGODB_URI as string;
let client: MongoClient;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
}
