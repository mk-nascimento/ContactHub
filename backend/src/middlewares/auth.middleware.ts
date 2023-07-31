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

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.loggedId;
  const user: User = (await usersRepo.findOneBy({ id }))!;
  const admin: boolean = user.role === 'admin';

  if (!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);
  res.locals.userRole = user.role;

  next();
};

export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const paramsId: string = req.params.id;
  const user: User = (await usersRepo.findOneBy({ id: paramsId }))!;

  const loggedId: string = res.locals.loggedId;
  const loggedUser: User = (await usersRepo.findOneBy({ id: loggedId }))!;

  const owner: boolean = loggedUser.id === user.id;
  const admin: boolean = loggedUser.role === 'admin';

  if (!!!owner && !!!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);
  res.locals.user_id = paramsId;

  next();
};
