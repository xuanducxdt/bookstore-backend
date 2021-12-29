/* eslint-disable linebreak-style */
export type Category = 'drama' | 'comedy' | 'sport';

export interface Book {
    title?: string;
    image?: string;
    category?: Category;
    quantity?: number;
    price?: number;
    description?: string;
}

export interface ListBookResponse {
    message: string;
    data: Book[];
    count: number;
}

export interface ListBookQuery {
    skip: string;
    limit: string
}

export interface DetailBookResponse {
    message: string;
    data: Book;
}
