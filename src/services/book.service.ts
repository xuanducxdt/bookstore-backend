/* eslint-disable linebreak-style */
import fs from 'fs';
import path from 'path';
import db from '../models';
import { RESPONSE_MESSAGE } from '../components/constants';
import { ResourceNotFoundError } from '../components/error';
import {
  Book,
  ListBookQuery,
  ListBookResponse,
  DetailBookResponse,
} from '../interfaces/book.interface';
import { CommonResponse } from '../interfaces';

export default class BookService {
  static async listBook(query: ListBookQuery = { limit: '', skip: '' }): Promise<ListBookResponse> {
    const pipelineAggregate = [];
    if (query.skip) {
      pipelineAggregate.push({ $skip: Number(query.skip) });
    }
    if (query.limit) {
      pipelineAggregate.push({ $limit: Number(query.limit) });
    }
    const numberOfBooks = await db.Book.countDocuments();
    const listBookResultTmp = await db.Book.aggregate([
      {
        $project: { __v: 0 },
      },
      ...pipelineAggregate,
    ]);
    return {
      message: RESPONSE_MESSAGE.success,
      data: listBookResultTmp,
      count: numberOfBooks,
    };
  }

  static async retrieveBook(id: string): Promise<DetailBookResponse> {
    const foundBook = await db.Book.findOne({
      _id: id,
    }, {
      __v: 0,
    }).lean();
    return {
      message: RESPONSE_MESSAGE.success,
      data: foundBook,
    };
  }

  static async createBook(bookData: Book, filename: string): Promise<CommonResponse> {
    await db.Book.create({
      ...bookData,
      image: `/images/book/${filename}`,
    });
    return {
      message: RESPONSE_MESSAGE.success,
    };
  }

  static async updateBook(id: string, bookData: Book): Promise<DetailBookResponse> {
    const foundBook = await db.Book.findOne({
      _id: id,
    }, {
      __v: 0,
    }).lean();
    if (!foundBook) throw new ResourceNotFoundError('book');
    await db.Book.updateOne({
      _id: id,
    }, {
      ...bookData,
    });
    return {
      message: RESPONSE_MESSAGE.success,
      data: {
        ...foundBook,
        ...bookData,
      },
    };
  }

  static async updateBookImage(id: string, filename: string): Promise<DetailBookResponse> {
    const foundBook = await db.Book.findOne({
      _id: id,
    }, {
      __v: 0,
    }).lean();
    if (!foundBook) throw new ResourceNotFoundError('book');
    const { image: oldImage } = foundBook;
    const oldImagePath = path.join(__dirname, '../public', oldImage);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(path.join(__dirname, '../public', oldImage));
    }
    await db.Book.updateOne({
      _id: id,
    }, {
      image: `/images/book/${filename}`,
    });
    return {
      message: RESPONSE_MESSAGE.success,
      data: {
        ...foundBook,
        image: `/images/book/${filename}`,
      },
    };
  }

  static async deleteBook(id: string): Promise<CommonResponse> {
    const foundBook = await db.Book.findOne({
      _id: id,
    });
    if (!foundBook) throw new ResourceNotFoundError('book');
    await db.Book.deleteOne({
      _id: id,
    });
    return {
      message: RESPONSE_MESSAGE.success,
    };
  }
}
