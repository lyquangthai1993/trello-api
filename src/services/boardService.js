/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { cloneDeep } from 'lodash';

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lí logic dữ liệu liệu
    const newObject = {
      ...reqBody,
      slug: slugify(reqBody?.title)
    };

    const createdObject = await boardModel.createNew(newObject);

    // tra ve object detail moi vua tao
    return await boardModel.findOneById(createdObject.insertedId);
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // tra ve object detail moi vua tao
    const boardDetails = await boardModel.getDetails(boardId);

    if (!boardDetails) {
      // noinspection ExceptionCaughtLocallyJS
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
    }

    const resBoard = cloneDeep(boardDetails);

    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id));
    });


    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails
};
