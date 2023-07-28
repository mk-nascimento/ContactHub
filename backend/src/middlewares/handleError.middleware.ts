import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { AppError } from '../error';

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

/**
 * Middleware to handle errors and send appropriate responses.
 * @param {Error} err - The error object.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The function to call the next middleware or route.
 * @returns {Response} - The response with appropriate status code and error message.
 */
const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

  if (err instanceof ZodError) return res.status(BAD_REQUEST).json({ message: err.flatten().fieldErrors });

  return res.status(INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default handleError;
