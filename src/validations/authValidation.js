/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    });

    //validate dữ liệu hợp lệ thì cho request đi tiếp qua tầng controller
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const authenticate = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(1)
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    });

    //validate dữ liệu hợp lệ thì cho request đi tiếp qua tầng controller
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const authValidation = {
  createNew,
  authenticate

};
