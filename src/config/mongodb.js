/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const MONGODB_URI = process.env.MONGODB_URI;

const DATABASE_NAME = process.env.DATABASE_NAME;

import { MongoClient, ServerApiVersion } from 'mongodb';

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  // serverApi có từ phiên bản 5.0.0 trở lên, có thể không cần dùng nó để kết nối
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to DB First');
  }

  return trelloDatabaseInstance;
};


export const CLOSE_DB = async () => {

  await mongoClientInstance.close();

};
