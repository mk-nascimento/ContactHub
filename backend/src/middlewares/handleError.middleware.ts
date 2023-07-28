import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { AppError } from '../error';

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

  if (err instanceof ZodError) return res.status(BAD_REQUEST).json({ message: err.flatten().fieldErrors });

  return res.status(INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default handleError;
