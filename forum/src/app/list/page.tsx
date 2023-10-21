import { connectDB } from '@/src/util/database';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

export default async function List() {
  const db = (await connectDB).db('forum');
  let posts = await db.collection('post').find().toArray();
  return (
    <div className='list-bg'>
      <ListItem postsJSON={JSON.stringify(posts)} />
    </div>
  );
}
