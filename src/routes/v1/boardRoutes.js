/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API GET LIST BOARDS'
    });
  })
  .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')
  .get(boardValidation.getDetails, boardController.getDetails)
  .put(boardValidation.update, boardController.update)
  .delete(boardValidation.deleteId, boardController.deleteId);

Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToDifferent, boardController.moveCardToDifferent);
export const boardRoutes = Router;
