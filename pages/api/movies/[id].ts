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

  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.status(200).json(movie);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
