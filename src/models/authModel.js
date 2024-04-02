import Joi from 'joi';
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

// Define Collection (name & schema)
const COLLECTION_NAME = 'users';
const COLLECTION_SCHEMA = Joi.object({
  firstName: Joi.string().required().min(1).max(50).trim().strict(),
  lastName: Joi.string().required().min(1).max(50).trim().strict(),
  email: Joi.string().required(),
  password: Joi.string().required(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});
const validateBeforeCreate = async (data) => {
  return await COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB().collection(COLLECTION_NAME).insertOne({
      ...validData
    });
  } catch (error) {
    throw new Error(error);
  }
};

const authenticate = async (data) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).findOne({
      email: data.email
    });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};


export const authModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  createNew,
  authenticate,
  findOneById
};
