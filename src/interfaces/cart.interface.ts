/* eslint-disable linebreak-style */
import { Book } from './book.interface';

export interface Cart {
    totalAmount: number;
    book: any;
    owner: any;
    isPaid: boolean;
}

export interface ListCartResponse {
    message: string;
    data: [{
        totalAmount: number;
        book: Book;
        owner: any;
        isPaid: boolean;
    }]
}

export interface CartCountResponse {
    cartCount: number;
}

export interface RetrieveCartResponse {
    message: string;
    data: {
        totalAmount: number;
        book: Book;
        owner: any;
        isPaid: boolean;
    }
}

export interface AddNewCartResponse {
    message: string;
    data: {
        isNewBook: boolean;
    }
}

export interface CartData {
    book: string;
    owner: string;
    totalAmount: number;
}
