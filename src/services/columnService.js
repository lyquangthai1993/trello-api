/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';

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

export const columnService = {
  createNew
};
