/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';

const createNew = async (reqBody) => {
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

const getDetail = async (boardId) => {
  try {
    // tra ve object detail moi vua tao
    return await boardModel.findOneById(boardId);
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetail
};
