/* eslint-disable linebreak-style */
export const RESPONSE_MESSAGE = {
  success: 'Success',
};

export const ERROR_MESSAGE = {
  uniqueEmail: 'Email must be unique',
  unauthorized: 'Unauthorized',
  noTokenProvided: 'No token provided',
  forbidden: 'Forbidden',
  notAllowed: 'You are not allowed',
  incorrectEmailOrPassword: 'Incorrect Email or Password',
  validationBookQuantity: 'The number of books is not enough',
  isPaid: 'This book is paid',
  invalidPassword: 'Password must be included lowercase letters, at least 1 uppercase letter, numbers and symbol',
  invalidEmail: 'Invalid email address',
};

export const ERROR_STATUS: any = {
  ValidationError: 400,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
};

export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
};

export const BOOK_CATEGORIES = {
  drama: 'drama',
  comedy: 'comedy',
  sport: 'sport',
};
