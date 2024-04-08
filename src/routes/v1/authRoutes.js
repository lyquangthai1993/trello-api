import express from 'express'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'
import { authHandlingMiddleware } from '~/middlewares/authMiddleware'


const Router = express.Router()

Router.route('/login')
  .post(authValidation.authenticate, authController.authenticate)

Router.route('/register')
  .post(authValidation.createNew, authController.createNew)

// Apply middleware to all other routes
Router.use(authHandlingMiddleware)

export const authRoutes = Router
