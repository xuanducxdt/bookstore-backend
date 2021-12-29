/* eslint-disable linebreak-style */
import express from 'express';
import Joi from 'joi';
import { BOOK_CATEGORIES, USER_ROLES } from '../components/constants';
import BookController from '../controllers/book.controller';
import permit from '../middlewares/permit.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import { imageUpload } from '../utils/imageUpload';

const router = express.Router();

router.get(
  '/',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  BookController.listBook,
);

router.get(
  '/:id',
  permit([USER_ROLES.admin, USER_ROLES.user]),
  validateRequest({
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  BookController.retrieveBook,
);

router.post(
  '/',
  permit([USER_ROLES.admin]),
  imageUpload.single('image'),
  validateRequest({
    bodySchema: {
      title: Joi.string().required(),
      category: Joi.string().valid(...Object.keys(BOOK_CATEGORIES)).required(),
      quantity: Joi.number().min(0).required(),
      price: Joi.number().min(0).required(),
      description: Joi.string().required(),
    },
    fileSchema: {
      filename: Joi.string().valid('image').required(),
    },
  }),
  BookController.createBook,
);

router.put(
  '/:id',
  permit([USER_ROLES.admin]),
  validateRequest({
    bodySchema: {
      title: Joi.string().optional(),
      category: Joi.string().valid(...Object.keys(BOOK_CATEGORIES)).optional(),
      quantity: Joi.number().min(0).optional(),
      price: Joi.number().min(0).optional(),
      description: Joi.string().optional(),
    },
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  BookController.updateBook,
);

router.put(
  '/:id/image',
  permit([USER_ROLES.admin]),
  imageUpload.single('image'),
  validateRequest({
    fileSchema: {
      filename: Joi.string().valid('image').required(),
    },
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  BookController.updateBookImage,
);

router.delete(
  '/:id',
  permit([USER_ROLES.admin]),
  validateRequest({
    paramSchema: {
      id: Joi.string().required(),
    },
  }),
  BookController.deleteBook,
);

export default router;
