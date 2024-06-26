/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { BOARD_TYPE } from '~/utils/constants'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { authModel } from '~/models/authModel'

const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),

  owner: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

// chi dinh nhung truong nao khong su dung trong ham update
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // const userFoundByEmail = await authModel.findOneById()
    validData.owner = new ObjectId(data.owner)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const getList = async (userId, reqQuery) => {
  // console.log('reqQuery = ', reqQuery)

  const page = (reqQuery.page * 1) || 0
  const perPage = (reqQuery.perPage * 1) || 3

  try {
    const totalItems = await GET_DB().collection(BOARD_COLLECTION_NAME)
      .find({ owner: new ObjectId(userId), _destroy: false })
      .count()

    const executionStats = await GET_DB().collection(BOARD_COLLECTION_NAME)
      .find({ owner: new ObjectId(userId) }).explain('executionStats')
    console.log('executionStats = ', executionStats)

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME)
    // .find({ owner: new ObjectId(userId) })
      .aggregate([
        {
          $match: {
            owner: new ObjectId(userId),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: authModel.COLLECTION_NAME,
            localField: 'owner',
            foreignField: '_id',
            pipeline: [
              {
                $match: {
                  _destroy: false
                }
              }
            ],
            as: 'ownerInfo'
          }
        },
        { $sort: { 'createdAt': -1 } },
        { $skip: page * perPage },
        { $limit: perPage }
      ])
    // .sort({ 'createdAt': -1 })
    // .skip(page * perPage)
    // .limit(perPage)
      .toArray()
    const totalPages = Math.ceil(totalItems / (perPage * 1))
    return { items: result || [], totalItems, totalPages }
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (boardId, updateData) => {
  try {
    INVALID_UPDATE_FIELDS.map(fieldName => {
      delete updateData[fieldName]
    })

    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      {
        $set: updateData
      },
      { returnDocument: 'after' }
    )

  } catch (error) {
    throw new Error(error)
  }
}

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
    ]).toArray()
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const deleteBoard = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).delete({ id })
  } catch (error) {
    throw new Error(error)
  }
}

// nhiem vu ham nay la push 1 columnId vao cuoi mang columnOrderIds
const pushColumnOrderIds = async (column) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      {
        $push: { columnOrderIds: new ObjectId(column._id) }
      },
      { returnDocument: 'after' }
    )

  } catch (error) {
    throw new Error(error)
  }
}

// nhiem vu ham nay la pull(lay ra) 1 columnId ra khoi mang columnOrderIds
const pullColumnOrderIds = async (column) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      {
        $pull: { columnOrderIds: new ObjectId(column._id) }
      },
      { returnDocument: 'after' }
    )

  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  getList,
  update,
  findOneById,
  getDetails,
  deleteBoard,
  pushColumnOrderIds,
  pullColumnOrderIds
}
