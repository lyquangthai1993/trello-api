/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lí logic dữ liệu liệu
    const newObject = {
      ...reqBody
    };

    const createdObject = await cardModel.createNew(newObject);
    const newCreatedObject = await cardModel.findOneById(createdObject.insertedId);

    console.log('------newCreatedObject----', newCreatedObject);
    if (newCreatedObject) {
      await columnModel.pushCardOrderIds(newCreatedObject);
    }
    // tra ve object detail moi vua tao
    return newCreatedObject;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew
};
