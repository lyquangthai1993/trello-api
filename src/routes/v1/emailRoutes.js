import express from 'express'
import { emailValidation } from '~/validations/emailValidation'
import { emailController } from '~/controllers/emailController'


const Router = express.Router()

Router.route('/sendEmail')
  .post(emailValidation.sendEmail, emailController.sendEmail)


export const emailRoutes = Router
