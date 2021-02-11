import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import 'newrelic';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import routes from './routes';
import DatabaseService from './services/Database.service';
import { cacheMiddleware, notFoundMiddleware, serverErrorMiddleware } from './middlewares';
import populateDatabase from './scripts/populateDatabase';
import collectionsMetada from './config/collections';

const {
  PORT = 8080,
  NODE_ENV,
  API_BASE_PATH = '/',
  PROTOCOL = 'http',
  BASE_URL = 'localhost',
  POPULATE_DATABASE,
  ENABLE_COMPRESSION,
  CACHE_TTL = '60',
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(cors());

if (ENABLE_COMPRESSION) {
  app.use(compression());
}

if (CACHE_TTL !== '-1') {
  app.use(API_BASE_PATH, cacheMiddleware(Number(CACHE_TTL)), routes);
}

/** Error handling */
app.use(notFoundMiddleware);
app.use(serverErrorMiddleware);

const httpServer = http.createServer(app);

(async () => {
  DatabaseService.setCollections(collectionsMetada);
  await DatabaseService.connect();
  if (POPULATE_DATABASE) populateDatabase(true);

  /* istanbul ignore if */
  if (NODE_ENV !== 'test') {
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at ${PROTOCOL}://${BASE_URL}:${PORT} in ${NODE_ENV} mode`);
      httpServer.emit('listening');
    });
  }
})();

export { httpServer as server, app };
