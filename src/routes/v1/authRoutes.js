import express from 'express'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'
import { authHandlingMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/login')
  .post(authValidation.authenticate, authController.authenticate)

Router.route('/register')
  .post(authValidation.createNew, authController.createNew)

Router.route('/refresh-token')
  .post(authValidation.refreshToken, authController.refreshToken)

Router.route('/me')
  .get(authController.authorize)

// Apply middleware to all other routes
Router.use(authHandlingMiddleware)

export const authRoutes = Router
