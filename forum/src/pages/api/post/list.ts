import { connectDB } from '@/src/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = (await connectDB).db('forum');
    let data = await db.collection('post').find().toArray();
    return res.status(200).json(data);
  }
}
