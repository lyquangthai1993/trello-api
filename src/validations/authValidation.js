import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    first_name: Joi.string().required().trim().strict(),
    last_name: Joi.string().required().trim().strict(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })

    //validate dữ liệu hợp lệ thì cho request đi tiếp qua tầng controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const authenticate = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(1)
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })

    //validate dữ liệu hợp lệ thì cho request đi tiếp qua tầng controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const refreshToken = async (req, res, next) => {
  const correctCondition = Joi.object({
    refreshToken: Joi.string().required()
  }).unknown()

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })

    //validate dữ liệu hợp lệ thì cho request đi tiếp qua tầng controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const authValidation = {
  createNew,
  authenticate,
  refreshToken
}
