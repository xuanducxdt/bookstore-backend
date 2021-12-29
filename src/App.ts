/* eslint-disable linebreak-style */
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import routes from './routes/index';
import swaggerDocument from './locales/swagger.json';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true }),
);

export default app;
