import Joi from 'joi';
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import bscrypt from 'bcrypt';

// const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

// Define Collection (name & schema)
const COLLECTION_NAME = 'users';
const COLLECTION_SCHEMA = Joi.object({
  first_name: Joi.string().required().min(1).trim().strict(),
  last_name: Joi.string().required().min(1).trim().strict(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

function checkData(data, message = 'Missing data') {
  if (!data) throw Error(message);
}

const validateBeforeCreate = async (data) => {
  return await COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    data.password = bscrypt.hashSync(data.password, 10);

    const validData = await validateBeforeCreate(data);
    const hasEmail = await GET_DB().collection(COLLECTION_NAME).findOne({ email: data?.email });

    checkData(hasEmail, 'Email already exists');

    return await GET_DB().collection(COLLECTION_NAME).insertOne({
      ...validData
    });
  } catch (error) {
    throw new Error(error);
  }
};

const authenticate = async (data) => {
  try {
    const userFoundByEmail = await GET_DB().collection(COLLECTION_NAME).findOne({ email: data?.email });

    checkData(userFoundByEmail, 'User not found');

    const isPasswordMatch = bscrypt.compareSync(data.password, userFoundByEmail.password);

    checkData(isPasswordMatch, 'Password not match');

    return userFoundByEmail;
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
