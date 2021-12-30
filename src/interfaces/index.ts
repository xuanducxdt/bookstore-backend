/* eslint-disable linebreak-style */
export interface ConfigData {
    nodeEnv: string;
    port: number | string;
    hashSecretKey: string;
    tokenSecretKey: string;
    mongoDB: {
      host: string;
      port: string;
      database: string;
      testDatabase: string;
    }
}

export interface CommonResponse {
  message: string;
}
