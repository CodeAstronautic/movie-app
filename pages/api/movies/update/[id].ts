import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  if (req.method === 'PUT') {
    const { title, publishingYear, img } = req.body;

    if (!title || !publishingYear || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connectToDatabase();
    await db.collection('movies').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, publishingYear, img } }
    );

    res.status(200).json({ message: 'Movie updated successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
