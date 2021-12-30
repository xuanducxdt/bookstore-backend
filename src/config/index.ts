/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

import { ConfigData } from '../interfaces';

const config: ConfigData = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  hashSecretKey: process.env.HASH_SECRET_KEY || '@!xdt~',
  tokenSecretKey: process.env.TOKEN_SECRET_KEY || '@!xdt-jwt~',
  mongoDB: {
    host: process.env.MONGO_DB_HOST || 'localhost',
    port: process.env.MONGO_DB_PORT || '27017',
    database: process.env.MONGO_DB_DATABASE || 'bookstore',
    testDatabase: process.env.MONGO_DB_TEST_DATABASE || 'test-bookstore',
  },
};

export default config;