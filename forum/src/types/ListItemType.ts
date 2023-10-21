import { ObjectId } from 'mongodb';

export default interface ListItemType {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
}
