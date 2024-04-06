import { StatusCodes } from 'http-status-codes'
import { emailService } from '~/services/emailService'


const sendEmail = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service

    const createdBoard = await emailService.sendEmail(req.body)

    // kết quả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

export const emailController = {
  sendEmail
}
