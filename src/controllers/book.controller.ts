/* eslint-disable linebreak-style */
import BookService from '../services/book.service';

export default class BookController {
  static async listBook(req: any, res: any, next: any): Promise<any> {
    try {
      console.log('req.query: ', req.query);
      const result = await BookService.listBook(req.query);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async retrieveBook(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const result = await BookService.retrieveBook(id);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req: any, res: any, next: any): Promise<any> {
    try {
      const imageFile = req.file;
      const { filename } = imageFile;
      const bookData = { ...req.body };
      const result = await BookService.createBook(bookData, filename);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const bookData = { ...req.body };
      const result = await BookService.updateBook(id, bookData);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async updateBookImage(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const imageFile = req.file;
      const { filename } = imageFile;
      const result = await BookService.updateBookImage(id, filename);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const result = await BookService.deleteBook(id);
      res.responseData = result;
      next();
    } catch (error) {
      next(error);
    }
  }
}
