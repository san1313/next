import fs from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
let connectDB: Promise<MongoClient>;
const PATH = process.env.KEY_PATH as string;
const DB_URL = process.env.DB_URL as string;

const keyPath = path.join(...PATH.split('/'));
const credentials = fs.readFileSync(keyPath);
const url = DB_URL;
const config = {
  key: credentials,
  cert: credentials,
  serverApi: ServerApiVersion.v1,
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, config).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, config).connect();
}

export { connectDB };
