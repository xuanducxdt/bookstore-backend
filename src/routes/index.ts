/* eslint-disable linebreak-style */
import express from 'express';
import verifyJWT from '../middlewares/auth.middleware';
import errorHandler from '../middlewares/errorHandler.middleware';
import responseHandler from '../middlewares/responseHandler.middleware';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import cartRoutes from './cart.routes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/book', verifyJWT, bookRoutes);
router.use('/cart', verifyJWT, cartRoutes);

router.use(responseHandler);
router.use(errorHandler);

export default router;
