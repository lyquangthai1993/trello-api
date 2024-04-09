import { authModel } from '~/models/authModel'

const createNew = async (reqBody) => {
  const createdObject = await authModel.createNew(reqBody)
  console.log('createNew createdObject = ', createdObject)
  if (!createdObject.result) {
    return {
      ...createdObject,
      result: !!createdObject.insertedId
    }
  }
  // tra ve object detail moi vua tao
  // const createdUser = await authModel.findOneById(createdObject.insertedId)
  //
  // return {
  //   ...createdUser,
  //   result: true
  // }
}
//
const authenticate = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await authModel.authenticate(reqBody)
  } catch (error) {
    throw error
  }
}

const update = async (cardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }

    return await authModel.update(cardId, updateData)
  } catch (error) {
    throw error
  }
}
export const authService = {
  createNew,
  update,
  authenticate
}
