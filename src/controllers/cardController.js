import { StatusCodes } from 'http-status-codes';
import { cardService } from '~/services/cardService';

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service

    const createdBoard = await cardService.createNew(req.body);

    // kết quả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const deleteId = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: cardId } = params;
    const cardDetail = await cardService.getDetail(cardId);

    console.log('deleteId-----', cardDetail);


    res.status(StatusCodes.OK).json(cardDetail);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: cardId } = params;
    const detailBoard = await cardService.getDetails(cardId);

    res.status(StatusCodes.OK).json(detailBoard);
  } catch (error) {
    next(error);
  }
};


export const cardController = {
  createNew,
  deleteId,
  getDetails
};
