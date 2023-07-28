import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Contact } from '../entities/contacts.entity';
import { TContactPayload } from '../interfaces/contacts.interface';

export const createContactService = async (contactPayload: TContactPayload): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  return Promise;
};

export const listUsersService = async (): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  return Promise;
};

export const updateUsersService = async (contactId: string, contactPayload: TContactPayload): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  return Promise;
};

export const deleteUserService = async (contactId: string): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  return Promise;
};
