import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export const authHandlingMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const split = authHeader.split(' ')
    const prefix = split[0]
    const token = split[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || prefix !== 'Bearer') {
		  return res.status(StatusCodes.UNAUTHORIZED)
			  .send({
				  status: StatusCodes.UNAUTHORIZED,
				  statusText: 'Unauthorized',
				  result: false
			  })
      }

      req.user = user
      next()
    })
  } else {
	  return res.status(StatusCodes.UNAUTHORIZED)
		  .send({
			  status: StatusCodes.UNAUTHORIZED,
			  statusText: 'Unauthorized',
			  result: false
		  })
  }
}
