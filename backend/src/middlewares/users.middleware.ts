import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';
import { TUserPayload } from '../interfaces/users.interface';

/**
 * Middleware to check if a user with the provided ID exists.
 * @throws {AppError} - Throws an error with status 404 if the user is not found.
 */
export const isValidUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.user_id;

  const userExists: boolean = await userRepo.exist({ where: { id } });
  if (!!!userExists) throw new AppError('User not found', StatusCodes.NOT_FOUND);

  next();
};

/**
 * Middleware to check if the provided email for the user already exists.
 * @throws {AppError} - Throws an error with status 409 if the email already exists in the database.
 */
export const isValidUserEmail = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const update: boolean = req.method === 'PATCH';

  const { email }: Pick<TUserPayload, 'email'> = req.body;

  const userExists: boolean = await userRepo.exist({ where: { email } });
  if (email && userExists && !!!update) throw new AppError('Email already exists', StatusCodes.CONFLICT);

  next();
};
