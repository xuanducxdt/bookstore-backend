/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import config from '../config/index';

class MongoDB {
  static connect(): any {
    const { mongoDB: { host, port, database }, nodeEnv } = config;
    const connectString: string = `mongodb://${host}:${port}/${database}`;

    mongoose.set('debug', nodeEnv === 'development');
    return mongoose.connect(connectString);
  }
}

export default MongoDB;
