/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import { BOOK_CATEGORIES } from '../components/constants';
import { Book } from '../interfaces/book.interface';

const { Schema } = mongoose;

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: Object.keys(BOOK_CATEGORIES),
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
});

const BookModel = mongoose.model('book', bookSchema);

export default BookModel;
