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
 *
 * @throws {AppError} - Throws an error with status 404 if the user is not found.
 */
export const isValidUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = req.params.id;
  if (!isUUID(id)) throw new AppError('Invalid parameter: id is not a valid UUID');

  const userExists: boolean = await userRepo.exist({ where: { id } });
  if (!userExists) throw new AppError('User not found', StatusCodes.NOT_FOUND);

  res.locals.paramsId = id;

  next();
};

/**
 * Middleware to check if the provided email for the user already exists.
 *
 * @throws {AppError} - Throws an error with status 409 if the email already exists in the database.
 */
export const isValidUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.paramsId;
  const { email }: Pick<TUserPayload, 'email'> = req.body;

  if (email && req.method === 'PATCH') {
    const userInstance: User | null = await userRepo.findOne({ where: { email } });

    if (userInstance && userInstance.id !== id) throw new AppError('Email already exists', StatusCodes.CONFLICT);
  }

  const userExists: boolean = await userRepo.exist({ where: { email } });
  if (email && userExists && req.method === 'POST') throw new AppError('Email already exists', StatusCodes.CONFLICT);

  next();
};

/**
 * Middleware to check if the user making the request is the owner of the user resource or an admin.
 * It fetches the logged user data and the user data based on the 'loggedId' and 'paramsId' stored in 'res.locals'.
 * If the user is the owner of the resource or an admin, the middleware allows the request to proceed.
 * Otherwise, it throws an error with status code 403 (Forbidden).
 *
 * @throws {AppError} - Throws an error with status 403 if the user is neither the owner of the user resource nor an admin.
 */
export const isUserOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.paramsId;
  const loggedId: string = res.locals.loggedId;

  const loggedUser: User = (await userRepo.findOneBy({ id: loggedId }))!;

  const [admin, owner]: [boolean, boolean] = [loggedUser.role === 'admin', id === loggedId];

  if (!owner && !admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);

  next();
};
