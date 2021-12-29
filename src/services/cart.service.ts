/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import db from '../models';
import { RESPONSE_MESSAGE } from '../components/constants';
import { IsPaidError, ResourceNotFoundError, ValidationBookQuantityError } from '../components/error';
import BookService from './book.service';
import {
  AddNewCartResponse,
  CartCountResponse,
  CartData, ListCartResponse,
  RetrieveCartResponse,
} from '../interfaces/cart.interface';
import { Book } from '../interfaces/book.interface';
import { CommonResponse } from '../interfaces';

export default class CartService {
  static async listCart(ownerId: string): Promise<ListCartResponse> {
    const listCartResult = await db.Cart.find({
      owner: ownerId,
      isPaid: false,
    }, {
      __v: 0,
    }).populate('book', ['title', 'image', 'category', 'price', 'description', 'quantity']).lean();
    return {
      message: RESPONSE_MESSAGE.success,
      data: listCartResult,
    };
  }

  static async getCartCount(ownerId: string): Promise<CartCountResponse> {
    const cartCount = await db.Cart.count({
      owner: ownerId,
      isPaid: false,
    });
    return {
      cartCount,
    };
  }

  static async retrieveCart(id: string, ownerId: string): Promise<RetrieveCartResponse> {
    const foundBook = await db.Cart.findOne({
      _id: id,
      owner: ownerId,
      isPaid: false,
    }, {
      __v: 0,
    }).populate('book', ['title', 'image', 'category', 'price', 'description', 'quantity']).lean();
    return {
      message: RESPONSE_MESSAGE.success,
      data: foundBook,
    };
  }

  static async addNewBook(cartData: CartData): Promise<AddNewCartResponse> {
    const { data: bookData }: { data: Book } = await BookService.retrieveBook(cartData.book);
    if (!bookData) throw new ResourceNotFoundError('book');

    const bookQuantity: number = Number(bookData.quantity);

    if (bookQuantity < cartData.totalAmount) {
      throw new ValidationBookQuantityError();
    }

    await BookService.updateBook(cartData.book, {
      quantity: bookQuantity - cartData.totalAmount,
    });

    const foundCart = await db.Cart.findOne({
      owner: cartData.owner,
      book: cartData.book,
      isPaid: false,
    }, {
      __v: 0,
    }).lean();
    let isNewBook = false;
    if (foundCart) {
      await db.Cart.updateOne({
        _id: foundCart._id,
      }, {
        totalAmount: cartData.totalAmount + foundCart.totalAmount,
      });
    } else {
      isNewBook = true;
      await db.Cart.create({
        ...cartData,
      });
    }

    return {
      message: RESPONSE_MESSAGE.success,
      data: {
        isNewBook,
      },
    };
  }

  static async updateCart(
    id: string, cartData: CartData, ownerId: string,
  ): Promise<RetrieveCartResponse> {
    const foundCart = await db.Cart.findOne({
      _id: id,
      owner: ownerId,
    }, {
      __v: 0,
    }).populate('book', ['title', 'image', 'category', 'price', 'description']).lean();

    if (!foundCart) throw new ResourceNotFoundError('cart');
    if (foundCart.isPaid) throw new IsPaidError();
    const { data: bookData } = await BookService.retrieveBook(foundCart.book);
    if (!bookData) throw new ResourceNotFoundError('book');

    const bookQuantity: number = Number(bookData.quantity);

    if (cartData.totalAmount) {
      if (cartData.totalAmount < foundCart.totalAmount) {
        const diffTotalAmount = foundCart.totalAmount - cartData.totalAmount;
        await BookService.updateBook(foundCart.book, {
          quantity: bookQuantity + diffTotalAmount,
        });
      } else if (cartData.totalAmount > foundCart.totalAmount) {
        const diffTotalAmount = cartData.totalAmount - foundCart.totalAmount;
        if (diffTotalAmount > bookQuantity) {
          throw new ValidationBookQuantityError();
        } else {
          await BookService.updateBook(foundCart.book, {
            quantity: bookQuantity - diffTotalAmount,
          });
        }
      }
    }
    await db.Cart.updateOne({
      _id: id,
    }, {
      ...cartData,
    });
    return {
      message: RESPONSE_MESSAGE.success,
      data: {
        ...foundCart,
        ...cartData,
      },
    };
  }

  static async deleteCart(id: string, ownerId: string): Promise<CommonResponse> {
    const foundCart = await db.Cart.findOne({
      _id: id,
      owner: ownerId,
    }, {
      __v: 0,
    }).lean();

    if (!foundCart) throw new ResourceNotFoundError('cart');
    if (foundCart.isPaid) throw new IsPaidError();
    const { data: bookData } = await BookService.retrieveBook(foundCart.book);
    if (!bookData) throw new ResourceNotFoundError('book');

    await BookService.updateBook(foundCart.book, {
      quantity: bookData.quantity + foundCart.totalAmount,
    });
    await db.Cart.deleteOne({
      _id: id,
    });
    return {
      message: RESPONSE_MESSAGE.success,
    };
  }
}
