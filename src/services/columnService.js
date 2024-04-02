/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';
import { cardModel } from '~/models/cardModel';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lí logic dữ liệu liệu
    const newObject = {
      ...reqBody
    };

    const createdObject = await columnModel.createNew(newObject);
    const newObjectCreated = await columnModel.findOneById(createdObject.insertedId);

    if (newObjectCreated) {
      newObjectCreated.cards = [];

      // cập nhật lại mảng columnOrderIds trong collections boards
      await boardModel.pushColumnOrderIds(newObjectCreated);
    }

    // tra ve object detail moi vua tao
    return await columnModel.findOneById(createdObject.insertedId);
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    };

    return await columnModel.update(columnId, updateData);
  } catch (error) {
    throw error;
  }
};

const deleteId = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetColumn = await columnModel.findOneById(columnId);

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!');
    }

    // B1: Remove cac cards ma co columnId, change _destroy = true
    await cardModel.removeByColumnId(columnId);

    // B2: Remove column voi columnId
    await columnModel.deleteId(columnId);

    // B3: cập nhật lại mảng columnOrderIds trong collections boards, remove columnId ra khoi columnOrderIds
    await boardModel.pullColumnOrderIds(targetColumn);

    return {
      message: 'Column and its Card(s) is deleted successfully!',
      result: true
    };

  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  update,
  deleteId
};
