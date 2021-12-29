/* eslint-disable linebreak-style */
import crypto from 'crypto';
import config from '../config';

export const hashString = (str: string, algorithm = 'sha256'): string => crypto.createHmac(algorithm, config.hashSecretKey).update(str).digest('hex');

export const isEmptyObject = (dataObject: any): boolean => Object.values(dataObject).length === 0;
