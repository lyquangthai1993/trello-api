import { StatusCodes } from 'http-status-codes';
import { columnService } from '~/services/columnService';

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu sang tầng service

    const createdBoard = await columnService.createNew(req.body);

    // kết quả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const deleteId = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: columnId } = params;
    const columnDetail = await columnService.deleteId(columnId);

    console.log('deleteId-----', columnDetail);


    res.status(StatusCodes.OK).json(columnDetail);
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: columnId } = params;
    const detailBoard = await columnService.getDetails(columnId);

    res.status(StatusCodes.OK).json(detailBoard);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const params = req.params;
    const { id: columnId } = params;
    const updatedColumn = await columnService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew,
  deleteId,
  getDetail,
  update
};
