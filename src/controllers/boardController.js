import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  console.log('req.query', req.query);
  console.log('req.params', req.params);
  try {
    res.status(StatusCodes.CREATED).json({
      message: 'POST FROM CONTROLLER'
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    });
  }
};

export const boardController = {
  createNew
};
