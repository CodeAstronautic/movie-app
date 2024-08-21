// pages/api/movies.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    
    // Extract query parameters for pagination
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page

    // Validate page and limit
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Page and limit must be positive integers' });
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    try {
      // Fetch the paginated results from MongoDB
      const movies = await db.collection('movies')
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();

      // Get the total count of documents for pagination metadata
      const totalMovies = await db.collection('movies').countDocuments();

      res.status(200).json({
        movies,
        pagination: {
          page,
          limit,
          total: totalMovies,
          totalPages: Math.ceil(totalMovies / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
