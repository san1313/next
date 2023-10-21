import Comment from '@/src/component/Comment';
import { connectDB } from '@/src/util/database';
import { ObjectId } from 'mongodb';

export default async function Detail({ params }: { params: { id: string } }) {
  const db = (await connectDB).db('forum');
  const result = await db.collection('post').findOne({ _id: new ObjectId(params.id) });
  if (result)
    return (
      <div>
        <h4>상세페이지임</h4>
        <h4>{result?.title}</h4>
        <p>{result?.content}</p>
        <Comment postId={result!._id.toString()} />
      </div>
    );
  else {
    return <div>음슴</div>;
  }
}
