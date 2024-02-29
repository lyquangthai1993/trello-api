/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const createNew = (req, res, next) => {
  const correctCondition = Joi.object({});

  res.status(StatusCodes.OK).json({
    messge: 'POST FROM VALIDATION API CREATE NEW BOARD'
  });
};

export const boardValidation = {
  createNew
};
