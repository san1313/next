'use client';

import { useEffect, useRef } from 'react';
import CommentType from '../types/CommentType';

export default function Comment({ postId }: { postId: string }) {
  const input = useRef<HTMLInputElement>(null);
  let comments: CommentType[];
  useEffect(() => {
    fetch('');
  }, []);

  async function submit() {
    if (input?.current?.value) {
      let body = {
        content: input.current.value,
        postId,
      };
      fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    }
  }

  return (
    <div>
      <div>
        <ul>
          <li>댓글1</li>
          <li>댓글2</li>
        </ul>
      </div>
      <input
        type='text'
        ref={input}
      />
      <button
        onClick={async () => {
          submit();
        }}>
        댓글전송
      </button>
    </div>
  );
}
