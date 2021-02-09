// require new relic
import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import DataBaseService from './services/DataBase.service';
import ApiError from './utils/ApiError';

const { PORT = 8080, NODE_ENV, API_BASE_URL = '/' } = process.env;
if (NODE_ENV === 'production') {
  require('newrelic');
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(cors());

app.use(API_BASE_URL, routes);

/** Error handling */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'No endpoint found for your request',
  });
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const { message = 'Unexpected error', code = 500, tags, details } = err;
  const status = typeof code === 'number' && code < 600 ? code : 500;

  res.status(status).json({
    message,
    code,
    tags,
    details,
  });
});

const httpServer = http.createServer(app);

(async () => {
  DataBaseService.setCollections(['artist', 'label', 'release']);
  await DataBaseService.connect();
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT} in ${NODE_ENV} mode`);
    httpServer.emit('listening');
  });
})();

export { httpServer as server, app };
