import { connectDB } from '@/src/util/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export async function POST(req: Request) {
  let session = await getServerSession(authOptions);
  const body = await req.json();
  const author = session?.user.email;
  const { content, postId } = body;
  if (!content || !author || !postId) return NextResponse.json({ err: 'empty' }, { status: 500 });
  const db = (await connectDB).db('forum').collection('comment');
  try {
    await db.insertOne({ content, author, postId });
  } catch (e) {
    return NextResponse.json({ err: 'DB Error' }, { status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
