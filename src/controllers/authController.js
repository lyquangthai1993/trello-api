import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const createdUser = await authService.createNew(req.body)
    console.log('createdUser = ', createdUser)
    if (!createdUser.result) {
      res.status(StatusCodes.UNAUTHORIZED).json(createdUser)
    } else {
      res.status(StatusCodes.CREATED).json(createdUser)
    }

  } catch (error) {
    next(error)
  }
}


const deleteId = async (req, res, next) => {
  try {
    const params = req.params
    const { id: cardId } = params
    const cardDetail = await authService.getDetail(cardId)

    res.status(StatusCodes.OK).json(cardDetail)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const params = req.params
    const { id: cardId } = params
    const detailBoard = await authService.getDetails(cardId)

    res.status(StatusCodes.OK).json(detailBoard)
  } catch (error) {
    next(error)
  }
}

const authenticate = async (req, res, next) => {
  try {
    const tokenRes = await authService.authenticate(req.body)

    if (tokenRes.result) {
      res.status(StatusCodes.OK).json(tokenRes)
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json(tokenRes)
    }

  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const params = req.params
    const { id: cardId } = params
    const updatedBoard = await authService.update(cardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}


export const authController = {
  createNew,
  update,
  deleteId,
  getDetails,
  authenticate
}
