/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express';
import exitHook from 'async-exit-hook';
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { mapOrder } from '~/utils/sorts.js';

const START_SERVER = () => {
  const app = express();
  app.use(express.json());

  const hostname = env.APP_HOST;
  const port = env.APP_PORT;

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());

    // Test Absolute import mapOrder
    // console.log(mapOrder([{ id: 'id-1', name: 'One' }, { id: 'id-2', name: 'Two' }, { id: 'id-3', name: 'Three' }, { id: 'id-4', name: 'Four' }, { id: 'id-5', name: 'Five' }], ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'], 'id'))

    res.end(`<h1>Hello World ${env.AUTHOR}!</h1><hr>`);
  });

  app.use('/v1', APIs_V1);

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Server is running at http://${hostname}:${port}/`);
  });

  exitHook(() => {
    console.log('4. Closing connect MongoDB ');
    CLOSE_DB();
  });
};

(async () => {
  try {
    console.warn('1. Connecting MongoDB Cloud Atlas .....');
    await CONNECT_DB();
    console.warn('2. Connected MongoDB Cloud Atlas');
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();


