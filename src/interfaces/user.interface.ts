/* eslint-disable linebreak-style */
export type UserRole = 'admin' | 'user';

export interface User {
    fullName?: string;
    email: string;
    password?: string;
    role?: string;
}

export interface LoginResponse {
    message: string;
    data: User;
}
