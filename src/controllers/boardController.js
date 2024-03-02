import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service

    const createdBoard = await boardService.createNew(req.body);

    // kết quả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const deleteId = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: boardId } = params;
    const boardDetail = await boardService.getDetail(boardId);

    console.log('deleteId-----', boardDetail);


    res.status(StatusCodes.OK).json(boardDetail);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: boardId } = params;
    const detailBoard = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(detailBoard);
  } catch (error) {
    next(error);
  }
};


export const boardController = {
  createNew,
  deleteId,
  getDetails
};
