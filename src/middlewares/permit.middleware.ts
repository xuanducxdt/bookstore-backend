/* eslint-disable linebreak-style */
import { ERROR_MESSAGE, ERROR_STATUS } from '../components/constants';

export default function permit(allowedRoles: string[]) {
  return async (req: any, res: any, next: any) => {
    const role = req.user && req.user.role;
    const foundRole: string | undefined = allowedRoles.find((r: string) => r === role);
    if (foundRole) return next();
    return next({
      statusCode: ERROR_STATUS.forbidden,
      message: ERROR_MESSAGE.notAllowed,
    });
  };
}
