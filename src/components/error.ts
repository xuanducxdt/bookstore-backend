/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-expressions */
import { ERROR_MESSAGE, ERROR_STATUS } from './constants';

export class UniqueUsernameError extends Error {
  status: number = 0;

  constructor(message = ERROR_MESSAGE.uniqueEmail) {
    super();
    this.message = message;
    this.name = 'UniqueUsernameError';
    this.status = ERROR_STATUS.badRequest;
  }
}

export class LoginError extends Error {
  status: number = 0;

  constructor(message = ERROR_MESSAGE.incorrectEmailOrPassword) {
    super();
    this.message = message;
    this.name = 'LoginError';
    this.status = ERROR_STATUS.notFound;
  }
}

export class ResourceNotFoundError extends Error {
  status: number = 0;

  constructor(fieldName: string) {
    super();
    this.message = `Could not find ${fieldName}`;
    this.name = 'ResourceNotFoundError';
    this.status = ERROR_STATUS.notFound;
  }
}

export class ValidationError extends Error {
  status: number = 0;

  constructor(fieldName: string) {
    super();
    this.message = `${fieldName} is required`;
    this.name = 'ValidationError';
    this.status = ERROR_STATUS.ValidationError;
  }
}

export class ValidationBookQuantityError extends Error {
  status: number = 0;

  constructor() {
    super();
    this.message = ERROR_MESSAGE.validationBookQuantity;
    this.name = 'ValidationBookQuantityError';
    this.status = ERROR_STATUS.ValidationError;
  }
}

export class IsPaidError extends Error {
  status: number = 0;

  constructor() {
    super();
    this.message = ERROR_MESSAGE.isPaid;
    this.name = 'IsPaidError';
    this.status = ERROR_STATUS.ValidationError;
  }
}
