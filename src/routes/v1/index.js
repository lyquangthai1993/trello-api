/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from '~/routes/v1/boardRoutes';
import { cardRoutes } from '~/routes/v1/cardRoutes';
import { columnRoutes } from '~/routes/v1/columnRoutes';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ messge: 'V1 ready to use' });
});

Router.use('/boards', boardRoutes);
Router.use('/cards', cardRoutes);
Router.use('/columns', columnRoutes);

export const APIs_V1 = Router;
