import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import jwt from 'jsonwebtoken'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lí logic dữ liệu
    const newObject = {
      ...reqBody,
      slug: slugify(reqBody?.title)
    }

    const createdObject = await boardModel.createNew(newObject)

    // tra ve object detail moi vua tao
    return await boardModel.findOneById(createdObject.insertedId)
  } catch (error) {
    throw error
  }
}

const getList = async (headersAuthorization) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lí logic dữ liệu
    const token = headersAuthorization.split(' ')[1]
    let authData = {
      _id: ''
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
      // console.log('authData = ', userData)
      // console.error('err = ', err)
      if (err) {
        return {
          result: false,
          data: []
        }
      } else {
        authData = userData
      }
    })

    const boards = await boardModel.getList(authData._id)
    // console.log('boards ========== ', boards)
    // tra ve ket qua
    return {
      result: true,
      data: boards,
      count: boards.length || 0
    }
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }

    return await boardModel.update(boardId, updateData)
  } catch (error) {
    throw error
  }
}

const moveCardToDifferent = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // B1: cập nhật mảng cardOrderIds của column cũ
    await columnModel.update(reqBody?.prevColumnId, {
      cardOrderIds: reqBody?.prevCardOrderIds,
      updatedAt: Date.now()
    })

    // B2: cập nhật mảng cardOrderIds của column mới
    await columnModel.update(reqBody?.nextColumnId, {
      cardOrderIds: reqBody?.nextCardOrderIds,
      updatedAt: Date.now()
    })

    // B3: cập nhật lại trường columnId của card mới move vào
    await cardModel.update(reqBody?.currentCardId, {
      columnId: reqBody?.nextColumnId,
      updatedAt: Date.now()
    })

    return { updateResult: 'success' }
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // tra ve object detail moi vua tao
    const boardDetails = await boardModel.getDetails(boardId)

    if (!boardDetails) {
      // noinspection ExceptionCaughtLocallyJS
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    const resBoard = cloneDeep(boardDetails)

    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })


    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew,
  getList,
  update,
  getDetails,
  moveCardToDifferent
}
