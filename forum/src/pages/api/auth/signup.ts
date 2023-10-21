import { connectDB } from '@/src/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let { name, email, password } = req.body;
    if (name && email && password) {
      let db = (await connectDB).db('forum');
      let exist = await db.collection('user_cred').findOne({ email });
      if (exist) return res.status(500).json('중복');
      let hash = await bcrypt.hash(password, 12);
      req.body.password = hash;
      req.body.role = 'user';
      await db.collection('user_cred').insertOne(req.body);
      return res.status(200).json('가입성공');
    }
  }
}
