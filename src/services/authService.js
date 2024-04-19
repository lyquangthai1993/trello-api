import { authModel } from '~/models/authModel'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
}
export const refreshToken = async (reqBody) => {
  const refreshToken = reqBody.refreshToken

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        // console.log('jwt.verify err = ', err)
        reject({ result: false, message: 'Invalid refresh token' })
      } else {
        const userDB = await authModel.findOneById(user?._id)
        // delete userDB.password
        // console.log('userDB = ', userDB)
        const newToken = generateAccessToken(userDB)
        resolve({ result: true, token: newToken })
      }
    })
  })
}

const createNew = async (reqBody) => {
  const createdObject = await authModel.createNew(reqBody)
  if (!createdObject.result) {
    return {
      ...createdObject,
      result: !!createdObject.insertedId
    }
  }
}

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
  authenticate,
  refreshToken
}
