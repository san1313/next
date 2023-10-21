'use client';

import ListItemType from '@/src/types/ListItemType';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ListItem({ postsJSON }: { postsJSON: string }) {
  const posts: ListItemType[] = JSON.parse(postsJSON);
  const { data: session } = useSession();
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div
            className='list-item'
            key={i}>
            <h4>
              <Link
                prefetch={false}
                href={`/detail/${post._id}`}>
                {post.title}
              </Link>
            </h4>
            {session?.user?.email === post.author || session?.user.role === 'admin' ? (
              <>
                <Link
                  href={`/edit/${post._id}`}
                  legacyBehavior>
                  <span>🖋️</span>
                </Link>
                <span
                  onClick={async e => {
                    await deletePost(e, post._id);
                  }}>
                  🗑️
                </span>
              </>
            ) : (
              <></>
            )}
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}

async function deletePost(event: React.MouseEvent, _id: ObjectId) {
  const target = event.target as HTMLSpanElement;
  const parent = target.parentElement as HTMLElement;

  fetch('/api/post/delete', {
    method: 'DELETE',
    body: _id.toString(),
  })
    .then(r => {
      if (r.status === 200) return r.json();
      throw new Error('invalid');
    })
    .then(r => {
      parent.style.opacity = '0';
      setTimeout(() => {
        parent.style.display = 'none';
      }, 1000);
    })
    .catch(e => console.error(e));
}
