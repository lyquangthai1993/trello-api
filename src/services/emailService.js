import nodemailer from 'nodemailer'
import { env } from '~/config/environment'


const sendEmail = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { to_email } = reqBody

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: env.EMAIL_DOMAIN || '',
        pass: env.EMAIL_PASSWORD || ''
      }
    })

    return await transporter.sendMail({
      from: '"Email Trello Test" <lyquangthai1993@gmail.com>', // sender address
      to: to_email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
  } catch (error) {
    throw error
  }
}


export const emailService = {
  sendEmail
}
