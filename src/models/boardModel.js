/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { BOARD_TYPE } from '~/utils/constants';
import { columnModel } from '~/models/columnModel';
import { cardModel } from '~/models/cardModel';

const BOARD_COLLECTION_NAME = 'boards';

const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

// chi dinh nhung truong nao khong su dung trong ham update
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (boardId, updateData) => {
  try {
    INVALID_UPDATE_FIELDS.map(fieldName => {
      delete updateData[fieldName];
    });

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      {
        $set: updateData
      },
      { returnDocument: 'after' }
    );

    console.log('update----board model------', result);
    return result;

  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: new ObjectId(id),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          pipeline: [
            {
              $match: {
                _destroy: false
              }
            }
          ],
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          pipeline: [
            {
              $match: {
                _destroy: false
              }
            }
          ],
          as: 'cards'
        }
      }
    ]).toArray();
    // console.log('result', result);
    return result[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBoard = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).delete({ id });
  } catch (error) {
    throw new Error(error);
  }
};

// nhiem vu ham nay la push 1 columnId vao cuoi mang columnOrderIds
const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      {
        $push: { columnOrderIds: new ObjectId(column._id) }
      },
      { returnDocument: 'after' }
    );

    console.log('pushColumnOrderIds----------', result);
    return result;

  } catch (error) {
    throw new Error(error);
  }
};

// nhiem vu ham nay la pull(lay ra) 1 columnId ra khoi mang columnOrderIds
const pullColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      {
        $pull: { columnOrderIds: new ObjectId(column._id) }
      },
      { returnDocument: 'after' }
    );

    console.log('pushColumnOrderIds----------', result);
    return result;

  } catch (error) {
    throw new Error(error);
  }
};
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  update,
  findOneById,
  getDetails,
  deleteBoard,
  pushColumnOrderIds,
  pullColumnOrderIds
};
