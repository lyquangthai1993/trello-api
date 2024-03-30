
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const sendEmail = async (req, res, next) => {
  const correctCondition = Joi.object({
    to_email: Joi.string().email().required()
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


export const emailValidation = {
  sendEmail
};
