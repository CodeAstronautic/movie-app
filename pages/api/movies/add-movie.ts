import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, publishingYear, img } = req.body;

    if (!title || !publishingYear || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connectToDatabase();
    await db.collection('movies').insertOne({ title, publishingYear, img });

    res.status(201).json({ message: 'Movie added successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
