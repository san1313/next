import { connectDB } from '@/src/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const schema = z.object({
  _id: z.string().length(24),
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      schema.parse(data);
    } catch (err) {
      return res.status(500).json({ status: 'error', code: '유효성검증' });
    }
    try {
      let { title, content } = data;
      (await connectDB)
        .db('forum')
        .collection('post')
        .updateOne({ _id: new ObjectId(data._id) }, { $set: { title, content } });
    } catch (err) {
      return res.status(500).json({ status: 'error', code: 'DB에러' });
    }
    return res.redirect(301, '/list');
  }
}
