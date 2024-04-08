import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'
import { cardRoutes } from '~/routes/v1/cardRoutes'
import { columnRoutes } from '~/routes/v1/columnRoutes'
import { emailRoutes } from '~/routes/v1/emailRoutes'
import { authRoutes } from '~/routes/v1/authRoutes'
import { authHandlingMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ messge: 'V1 ready to use' })
})

Router.use('/boards', authHandlingMiddleware, boardRoutes)
Router.use('/cards', authHandlingMiddleware, cardRoutes)
Router.use('/columns', authHandlingMiddleware, columnRoutes)
Router.use('/emails', authHandlingMiddleware, emailRoutes)
Router.use('/auth', authRoutes) // Do not use middleware here

export const APIs_V1 = Router
