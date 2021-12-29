/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import { ERROR_STATUS } from '../components/constants';

export default function errorHandler(err: any, req: any, res: any, next: any): Promise<any> {
  const status = err.status || err.statusCode || ERROR_STATUS[err.name] || 500;
  return res.status(status).send({
    statusCode: status,
    error: err.message,
  });
}
