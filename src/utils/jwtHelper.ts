/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import config from '../config';

export const signToken = (data: any, tokenLife = 3000000): any => new Promise((resolve, reject) => {
  jwt.sign(
    {
      data,
    },
    config.tokenSecretKey,
    {
      algorithm: 'HS256',
      expiresIn: tokenLife,
    },
    (error: any, token: string | undefined): void => {
      if (error) {
        reject(error);
      }
      resolve(token);
    },
  );
});

// eslint-disable-next-line max-len
export const verifyToken = (token: string, secretKey: string): any => new Promise((resolve, reject) => {
  jwt.verify(token, secretKey, (error: any, decoded: any) => {
    if (error) {
      return reject(error);
    }
    return resolve(decoded);
  });
});
