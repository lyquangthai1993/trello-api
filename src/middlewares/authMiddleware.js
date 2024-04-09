
import jwt from 'jsonwebtoken'

export const authHandlingMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const split = authHeader.split(' ')
    const prefix = split[0]
    const token = split[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || prefix !== 'Bearer') {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401, 'Unauthorized')
  }
}

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
}
