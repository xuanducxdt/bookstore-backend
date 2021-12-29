/* eslint-disable linebreak-style */
import express from 'express';
import Joi from 'joi';
import { ERROR_MESSAGE, USER_ROLES } from '../components/constants';
import UserController from '../controllers/user.controller';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = express.Router();

router.post(
  '/login',
  validateRequest({
    bodySchema: {
      email: Joi.string()
        .min(3)
        .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .required()
        .messages({
          'string.pattern.base': ERROR_MESSAGE.invalidEmail,
        }),
      password: Joi.string().required(),
    },
  }),
  UserController.login,
);

router.post(
  '/',
  validateRequest({
    bodySchema: {
      fullName: Joi.string().required(),
      email: Joi.string()
        .min(3)
        .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .required()
        .messages({
          'string.pattern.base': ERROR_MESSAGE.invalidEmail,
        }),
      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
          'string.pattern.base': ERROR_MESSAGE.invalidPassword,
        }),
      confirmPassword: Joi.ref('password'),
      role: Joi.string().valid(USER_ROLES.user).optional(),
    },
  }),
  UserController.createUser,
);

export default router;
