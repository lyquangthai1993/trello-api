/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'This field is required',
      'string.empty': 'This filed cannot be empty'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
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

export const boardValidation = {
  createNew
};
