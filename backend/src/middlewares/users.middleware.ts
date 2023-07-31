import { isUUID } from 'class-validator';
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

  const id: string = req.params.id;
  if (!isUUID(id)) throw new AppError('Invalid parameter: id is not a valid UUID');

  const userExists: boolean = await userRepo.exist({ where: { id } });
  if (!!!userExists) throw new AppError('User not found', StatusCodes.NOT_FOUND);

  res.locals.paramsId = id;

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

export const isUserOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.paramsId;
  const loggedId: string = res.locals.loggedId;

  const loggedUser: User = (await userRepo.findOneBy({ id: loggedId }))!;

  const [admin, owner]: [boolean, boolean] = [loggedUser.role === 'admin', id === loggedId];

  if (!!!owner && !!!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);

  next();
};
