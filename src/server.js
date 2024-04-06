/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()
  // const protectedRouter = express.Router()

  app.use(cors(corsOptions))
  app.use(express.json())

  const hostname = env.APP_HOST
  let port = env.APP_PORT

  app.get('/', async (req, res) => {
    res.end(`<h1>Hello World ${env.AUTHOR}!</h1><hr>`)
  })

  app.use('/v1', APIs_V1)

  // middleware handle error
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'dev') {
    port = env.APP_PORT

    app.listen(port, hostname, () => {
      console.log(`3. Server is running at dev at http://${hostname}:${port}/`)
    })
  }

  // production thì sẽ tự thêm port trên server
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Server is running at production at port: ${process.env.PORT}`)
    })
  }


  exitHook(async () => {
    console.log('4. Closing connect MongoDB ')
    await CLOSE_DB()
  })
};

(async () => {
  try {
    console.warn('1. Connecting MongoDB Cloud Atlas .....')
    await CONNECT_DB()
    console.warn('2. Connected MongoDB Cloud Atlas')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()


