/* eslint-disable linebreak-style */
import express from 'express';
import Joi from 'joi';
import { USER_ROLES } from '../components/constants';
import CartController from '../controllers/cart.controller';
import permit from '../middlewares/permit.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = express.Router();

router.get(
  '/',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  CartController.listCart,
);

router.get(
  '/count',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  CartController.getCartCount,
);

router.get(
  '/detail/:id',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  validateRequest({
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  CartController.retrieveCart,
);

router.post(
  '/',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  validateRequest({
    bodySchema: {
      book: Joi.string().required(),
      totalAmount: Joi.number().min(1).required(),
    },
  }),
  CartController.addNewBook,
);

router.put(
  '/:id',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  validateRequest({
    bodySchema: {
      totalAmount: Joi.number().min(1).optional(),
    },
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  CartController.updateCart,
);

router.delete(
  '/:id',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  validateRequest({
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  CartController.deleteCart,
);

export default router;
