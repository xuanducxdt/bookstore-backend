/* eslint-disable linebreak-style */
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: any, res: any, next: any): Promise<any> {
    try {
      const userData = { ...req.body };
      const result = await UserService.login(userData);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: any, res: any, next: any): Promise<any> {
    try {
      const userData = { ...req.body };
      const result = await UserService.createUser(userData);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }
}
