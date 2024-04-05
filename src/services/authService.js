/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { authModel } from '~/models/authModel';
import { columnModel } from '~/models/columnModel';

const createNew = async (reqBody) => {
  try {


    const createdObject = await authModel.createNew(reqBody);
    const newCreatedObject = await authModel.findOneById(createdObject.insertedId);

    if (newCreatedObject) {
      await columnModel.pushCardOrderIds(newCreatedObject);
    }
    // tra ve object detail moi vua tao
    return newCreatedObject;
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    console.log('finally');
  }
};

const authenticate = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await authModel.authenticate(reqBody);
    delete result.password;
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (cardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    };

    return await authModel.update(cardId, updateData);
  } catch (error) {
    throw error;
  }
};
export const authService = {
  createNew,
  update,
  authenticate
};
