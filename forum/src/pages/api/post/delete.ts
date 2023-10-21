import { connectDB } from '@/src/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() === 'delete') {
    let id = req.body;
    try {
      z.string()
        .regex(/[0-9a-f]{24}/)
        .parse(id);
    } catch (e) {
      return res.status(500).send(e);
    }
    try {
      (await connectDB)
        .db('forum')
        .collection('post')
        .deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      return res.status(500).send(e);
    }
    return res.status(200).json({ status: '200', statusText: '성공' });
  }
}
