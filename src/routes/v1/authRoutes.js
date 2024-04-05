import express from 'express';
import { authValidation } from '~/validations/authValidation';
import { authController } from '~/controllers/authController';


const Router = express.Router();

Router.route('/login')
  .post(authValidation.authenticate, authController.authenticate);

Router.route('/register')
  .post(authValidation.createNew, authController.createNew);
export const authRoutes = Router;
