/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from '~/routes/v1/boardRoutes';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ messge: 'V1 ready to use' });
});

Router.use('/boards', boardRoutes);


export const APIs_V1 = Router;
