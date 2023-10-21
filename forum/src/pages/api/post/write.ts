import { connectDB } from '@/src/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let session = await getServerSession(req, res, authOptions);
  if (req.method === 'POST') {
    let data = req.body;
    if (session) data.author = session?.user?.email;
    if (data.title === '' || data.content === '') return res.status(500).json('제목');
    let db = (await connectDB).db('forum');
    try {
      db.collection('post').insertOne(data);
    } catch (err) {
      return res.status(500).send('err');
    }
    return res.redirect(301, '/list');
  }
}
