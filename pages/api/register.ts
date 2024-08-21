import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs'; // For hashing passwords
import { MongoClient } from 'mongodb';
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
  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  const hashedPassword = await hash(password, 12); // Hash the password

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'User registered successfully' });
}
