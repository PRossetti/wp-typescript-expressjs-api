import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import 'newrelic';
import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import DatabaseService from './services/Database.service';
import populateDatabase from './scripts/populateDatabase';

const {
  PORT = 8080,
  NODE_ENV,
  API_BASE_PATH = '/',
  PROTOCOL = 'http',
  BASE_URL = 'localhost',
  POPULATE_DATABASE,
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(cors());

app.use(API_BASE_PATH, routes);

/** Error handling */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'No endpoint found for your request',
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { message = 'Unexpected error', code = 500, tags, details, stack } = err;
  const status = typeof code === 'number' && code < 600 ? code : 500;
  console.error(`[Error handler] ${message}`, { code, tags, details, stack });

  res.status(status).json({
    message,
    code,
    tags,
    details,
  });
});

const httpServer = http.createServer(app);

(async () => {
  DatabaseService.setCollections([
    { name: 'artist', uniqueField: 'id' },
    { name: 'label', uniqueField: 'id' },
    { name: 'release', uniqueField: 'title' },
  ]);
  await DatabaseService.connect();
  if (POPULATE_DATABASE) populateDatabase(true);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at ${PROTOCOL}://${BASE_URL}:${PORT} in ${NODE_ENV} mode`);
    httpServer.emit('listening');
  });
})();

export { httpServer as server, app };
