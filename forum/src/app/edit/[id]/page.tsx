import { connectDB } from '@/src/util/database';
import { ObjectId } from 'mongodb';

const db = await (await connectDB).db('forum').collection('post');

export default async function Edit({ params }: { params: { id: string } }) {
  const post = await db.findOne({ _id: new ObjectId(params.id) });
  return (
    <div>
      <h3>수정페이지</h3>
      <form action='/api/post/edit' method='POST'>
        <p>제목</p>
        <input type='text' name='title' defaultValue={post?.title} /> <p>내용</p>
        <input type='text' name='content' defaultValue={post?.content} />
        <input type='hidden' name='_id' defaultValue={post?._id.toString()} readOnly />
        <p></p>
        <div>
          <button type='submit'>수정</button>
        </div>
      </form>
    </div>
  );
}
