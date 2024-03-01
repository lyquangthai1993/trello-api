/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu liệu
    const newObject = {
      ...reqBody,
      slug: slugify(reqBody?.title)
    };

    return newObject;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew
};
