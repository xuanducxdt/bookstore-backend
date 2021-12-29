/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import { Cart } from '../interfaces/cart.interface';

const { Schema } = mongoose;

const cartSchema = new Schema<Cart>({
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'book',
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const CartModel = mongoose.model('cart', cartSchema);

export default CartModel;
