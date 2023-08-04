import { isUUID } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { Contact } from '../entities/contacts.entity';
import { AppError } from '../error';
import { TContactPayload } from '../interfaces/contacts.interface';

/**
 * Middleware to check if a contact with the provided ID exists.
 *
 * @throws {AppError} - Throws an error with status 404 if the contact is not found.
 */
export const isValidContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = req.params.id;
  if (!isUUID(id)) throw new AppError('Invalid parameter: id is not a valid UUID');

  const contactExists: boolean = await contactsRepo.exist({ where: { id } });
  if (!!!contactExists) throw new AppError('Contact not found', StatusCodes.NOT_FOUND);
  res.locals.paramsId = id;

  next();
};

/**
 * Middleware to check if the provided full_name for the contact already exists.
 *
 * @throws {AppError} - Throws an error with status 409 if the full_name already exists in the database.
 */
export const isValidContactFullname = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = res.locals.paramsId;
  const { full_name }: Pick<TContactPayload, 'full_name'> = req.body;

  if (full_name && req.method === 'PATCH') {
    const contactInstance: Contact | null = await contactsRepo.findOne({ where: { full_name } });

    if (contactInstance && contactInstance.id !== id) throw new AppError('That contact full name already exists', StatusCodes.CONFLICT);
  }

  const contactExists: boolean = await contactsRepo.exist({ where: { full_name } });
  if (full_name && contactExists && req.method === 'POST') throw new AppError('That contact full name already exists', StatusCodes.CONFLICT);

  next();
};

/**
 * Middleware to check if the provided email for the contact already exists.
 *
 * @throws {AppError} - Throws an error with status 409 if the email already exists in the database.
 */
export const isValidContactEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = res.locals.paramsId;
  const { email }: Pick<TContactPayload, 'email'> = req.body;

  if (email && req.method === 'PATCH') {
    const contactInstance: Contact | null = await contactsRepo.findOne({ where: { email } });

    if (contactInstance && contactInstance.id !== id) throw new AppError('That contact email already exists', StatusCodes.CONFLICT);
  }

  const contactExists: boolean = await contactsRepo.exist({ where: { email } });
  if (email && contactExists && req.method === 'POST') throw new AppError('That contact email already exists', StatusCodes.CONFLICT);

  next();
};

/**
 * Middleware to check if the provided cellphone number for the contact already exists.
 *
 * @throws {AppError} - Throws an error with status 409 if the cellphone number already exists in the database.
 */
export const isValidCellphone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const { cellphone }: Pick<TContactPayload, 'cellphone'> = req.body;

  if (cellphone && req.method === 'PATCH') {
    const id: string = res.locals.paramsId;
    const contactInstance: Contact | null = await contactsRepo.findOne({ where: { cellphone } });

    if (contactInstance && contactInstance.id !== id) throw new AppError('That contact cellphone already exists', StatusCodes.CONFLICT);
  }

  const contactExists: boolean = await contactsRepo.exist({ where: { cellphone } });
  if (cellphone && contactExists && req.method === 'POST') throw new AppError('That contact cellphone already exists', StatusCodes.CONFLICT);

  next();
};

/**
 * Middleware to check if the user making the request is the owner of the contact or an admin.
 * It fetches the contact and user data based on the 'paramsId' and 'loggedId' stored in 'res.locals'.
 * If the user is the owner of the contact or an admin, the middleware allows the request to proceed.
 * Otherwise, it throws an error with status code 403 (Forbidden).
 *
 * @throws {AppError} - Throws an error with status 403 if the user is neither the owner of the contact nor an admin.
 */
export const isContactOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = res.locals.paramsId;
  const loggedId: string = res.locals.loggedId;

  const { user: contactUser }: Contact = (await contactsRepo.findOne({ where: { id }, relations: { user: true } }))!;
  const user: User = (await userRepo.findOneBy({ id: loggedId }))!;

  const [admin, owner]: [boolean, boolean] = [user.role === 'admin', loggedId === contactUser.id];

  if (!!!owner && !!!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);

  next();
};
