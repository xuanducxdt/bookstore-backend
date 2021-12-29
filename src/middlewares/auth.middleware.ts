/* eslint-disable linebreak-style */
import { ERROR_MESSAGE, ERROR_STATUS } from '../components/constants';
import config from '../config';
import { verifyToken } from '../utils/jwtHelper';

export default async function verifyJWT(req: any, res: any, next: any): Promise<any> {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    try {
      const decoded = await verifyToken(token, config.tokenSecretKey);
      req.user = decoded.data;
      next();
    } catch (error) {
      next({
        statusCode: ERROR_STATUS.unauthorized,
        message: ERROR_MESSAGE.unauthorized,
      });
    }
  } else {
    next({
      statusCode: ERROR_STATUS.forbidden,
      message: ERROR_MESSAGE.noTokenProvided,
    });
  }
}
