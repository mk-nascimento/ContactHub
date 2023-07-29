import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Contact } from '../entities/contacts.entity';
import { AppError } from '../error';
import { TContactPayload } from '../interfaces/contacts.interface';

/**
 * Middleware to check if a contact with the provided ID exists.
 * @throws {AppError} - Throws an error with status 404 if the contact is not found.
 */
export const isValidContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = req.params.id;

  const contactExists: boolean = await contactsRepo.exist({ where: { id } });
  if (!!!contactExists) throw new AppError('Contact not found', StatusCodes.NOT_FOUND);
  res.locals.paramsId = id;

  next();
};

/**
 * Middleware to check if the provided email for the contact already exists.
 * @throws {AppError} - Throws an error with status 409 if the email already exists in the database.
 */
export const isValidContactEmail = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const { email }: Pick<TContactPayload, 'email'> = req.body;

  const contactExists: boolean = await contactsRepo.exist({ where: { email } });
  if (email && contactExists) throw new AppError('That contact email already exists', StatusCodes.CONFLICT);

  next();
};

/**
 * Middleware to check if the provided cellphone number for the contact already exists.
 * @throws {AppError} - Throws an error with status 409 if the cellphone number already exists in the database.
 */
export const isValidCellphone = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const contactsRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const { cellphone }: Pick<TContactPayload, 'cellphone'> = req.body;

  const contactExists: boolean = await contactsRepo.exist({ where: { cellphone } });
  if (cellphone && contactExists) throw new AppError('That cellphone already exists', StatusCodes.CONFLICT);

  next();
};
