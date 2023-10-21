import { ObjectId } from 'mongodb';

export default interface CommentType {
  _id: ObjectId;
  content: string;
  author: string;
  postId: string;
}
