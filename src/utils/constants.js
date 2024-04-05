/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { env } from '~/config/environment';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

export const WHITELIST_DOMAINS = env.WHITELIST_DOMAINS;


export const BOARD_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};

export const checkMissData=(data, message = 'Missing data') => {
  if (!data) throw ApiError(StatusCodes.NOT_FOUND, message);
};
