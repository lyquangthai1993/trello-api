import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service
    // console.log('req.user = ', req.user)
    const createdBoard = await boardService.createNew(req.body, req.user._id)

    // kết quả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getList = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const boards = await boardService.getList(req.headers.authorization)
    // console.log('boards = ', boards)
    // kết quả về phía client
    res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const params = req.params
    const { id: boardId } = params
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferent = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferent(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

const deleteId = async (req, res, next) => {
  try {
    const params = req.params
    const { id: boardId } = params
    const boardDetail = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(boardDetail)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const params = req.params
    const { id: boardId } = params
    const detailBoard = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(detailBoard)
  } catch (error) {
    next(error)
  }
}


export const boardController = {
  createNew,
  getList,
  update,
  deleteId,
  getDetails,
  moveCardToDifferent
}
