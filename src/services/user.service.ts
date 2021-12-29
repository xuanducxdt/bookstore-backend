/* eslint-disable linebreak-style */
import db from '../models';
import { UniqueUsernameError, LoginError } from '../components/error';
import { hashString } from '../utils/index';
import { signToken } from '../utils/jwtHelper';
import { RESPONSE_MESSAGE } from '../components/constants';
import { LoginResponse, User } from '../interfaces/user.interface';
import { CommonResponse } from '../interfaces';

export default class UserService {
  static async login(userData: User): Promise<LoginResponse> {
    const hashPassword = hashString(userData.password || '');
    const foundUser = await db.User.findOne({
      email: userData.email,
      password: hashPassword,
    }, {
      password: 0,
      __v: 0,
    }).lean();
    const accessToken = await signToken(foundUser);
    if (foundUser) {
      return {
        message: RESPONSE_MESSAGE.success,
        data: {
          ...foundUser,
          accessToken,
        },
      };
    }
    throw new LoginError();
  }

  static async createUser(userData: User): Promise<CommonResponse> {
    const foundUser = await db.User.findOne({ email: userData.email });
    if (!foundUser) {
      const hashPassword = hashString(userData.password || '');
      await db.User.create({
        ...userData,
        password: hashPassword,
      });
      return {
        message: RESPONSE_MESSAGE.success,
      };
    }
    throw new UniqueUsernameError();
  }
}
