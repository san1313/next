import moment from 'moment';
import 'moment/locale/ko';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let date = moment();
  return res.status(200).json(date.format('YYYY-MM-DD HH:mm:ss ddd'));
}
