import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';

/**
 * Middleware to verify the validity of the JWT token provided in the request headers.
 * If the token is valid, it extracts the 'sub' claim and sets it in 'res.locals.loggedId'.
 *
 * @throws {AppError} - Throws an error with status 401 if the token is missing or invalid.
 */
export const isTokenValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const SECRET_KEY: string | undefined = String(process.env.SECRET_KEY);
  const headersToken: string | undefined = req.headers.authorization;

  if (!!!SECRET_KEY) throw new AppError("Missing env var: 'SECRET_KEY'", StatusCodes.UNAUTHORIZED);
  if (!!!headersToken) throw new AppError('Missing bearer token', StatusCodes.UNAUTHORIZED);

  const [_, token]: Array<string> = headersToken.split(' ');
  verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, StatusCodes.UNAUTHORIZED);

    res.locals.loggedId = decoded.sub;
  });

  next();
};

/**
 * Middleware to check if the user making the request is an admin.
 * It fetches the user based on the 'loggedId' stored in 'res.locals' and checks their role.
 * If the user is an admin, it sets the 'userRole' property in 'res.locals'.
 *
 * @throws {AppError} - Throws an error with status 403 if the user is not an admin.
 */
export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.loggedId;
  const user: User = (await usersRepo.findOneBy({ id }))!;
  const admin: boolean = user.role === 'admin';

  if (!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);
  res.locals.userRole = user.role;

  next();
};
