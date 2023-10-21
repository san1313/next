import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Write() {
  if (!(await getServerSession(authOptions))) {
    return <div>로그인하세요</div>;
  }
  return (
    <div>
      <h4>글작성</h4>
      <form action='/api/post/write' method='POST'>
        <div>
          <label htmlFor='title'>제목 : </label>
          <input type='text' name='title' id='title' />
        </div>
        <div>
          <label htmlFor='content'>내용 : </label>
          <input type='text' name='content' id='content' />
        </div>
        <button type='submit'>작성</button>
      </form>
    </div>
  );
}
