/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import CartService from '../services/cart.service';

export default class CartController {
  static async listCart(req: any, res: any, next: any): Promise<any> {
    try {
      const ownerId = req.user && req.user._id;
      const result = await CartService.listCart(ownerId);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getCartCount(req: any, res: any, next: any): Promise<any> {
    try {
      const ownerId = req.user && req.user._id;
      const result = await CartService.getCartCount(ownerId);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async retrieveCart(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const ownerId = req.user && req.user._id;
      const result = await CartService.retrieveCart(id, ownerId);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async addNewBook(req: any, res: any, next: any): Promise<any> {
    try {
      const cartData = {
        owner: req.user && req.user._id,
        ...req.body,
      };
      const result = await CartService.addNewBook(cartData);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const cartData = { ...req.body };
      const ownerId = req.user && req.user._id;
      const result = await CartService.updateCart(id, cartData, ownerId);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const ownerId = req.user && req.user._id;
      const result = await CartService.deleteCart(id, ownerId);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }
}
