import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = BAD_REQUEST) {
    super(message);

    this.statusCode = statusCode;
  }
}
