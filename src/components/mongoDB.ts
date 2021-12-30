/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import config from '../config/index';

class MongoDB {
  static connect(connectString?: string): any {
    const { mongoDB: { host, port, database }, nodeEnv } = config;
    const connectStr: string = connectString || `mongodb://${host}:${port}/${database}`;

    mongoose.set('debug', nodeEnv === 'development');
    return mongoose.connect(connectStr);
  }
}

export default MongoDB;
