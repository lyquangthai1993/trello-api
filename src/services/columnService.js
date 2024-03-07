/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters';
import { columnModel } from '~/models/columnModel';
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

    const createdObject = await columnModel.createNew(newObject);

    // tra ve object detail moi vua tao
    return await columnModel.findOneById(createdObject.insertedId);
  } catch (error) {
    throw error;
  }
};

const getDetails = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // tra ve object detail moi vua tao
    const columnDetails = await columnModel.getDetails(columnId);

    if (!columnDetails) {
      // noinspection ExceptionCaughtLocallyJS
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found');
    }

    const resColumn = cloneDeep(columnDetails);

    resColumn.columns.forEach(column => {
      column.cards = resColumn.cards.filter(card => card.columnId.equals(column._id));
    });


    delete resColumn.cards;

    return resColumn;
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  getDetails
};
