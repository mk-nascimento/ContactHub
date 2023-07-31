import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { Contact } from '../entities/contacts.entity';
import { TContact, TContactList, TContactPayload, TContactUpdatePayload } from '../interfaces/contacts.interface';
import { contactSchemas as cS } from '../schemas';

export const createContactService = async (userId: string, contactPayload: TContactPayload): Promise<TContact> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const id: string = userId;
  const user: User = (await userRepo.findOneBy({ id }))!;
  console.log('passa aqui');

  const contactInstance: Contact = contactRepo.create({ ...contactPayload, user });
  await contactRepo.save(contactInstance);

  const contact: TContact = cS.contact.parse(contactInstance);

  return contact;
};

export const listContactsService = async (): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contactsInstance: Contact[] = await contactRepo.find({ order: { full_name: 'ASC' }, relations: { user: true } });
  const contacts: TContactList = cS.contactList.parse(contactsInstance);

  return contacts;
};

export const retrieveContactService = async (contactId: string): Promise<TContact> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = contactId;
  const contactInstance: Contact = (await contactRepo.findOneBy({ id }))!;

  const contact: TContact = cS.contact.parse(contactInstance);

  return contact;
};

export const updateContactService = async (contactId: string, contactPayload: TContactUpdatePayload): Promise<TContact> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = contactId;
  const dbContact: Contact = (await contactRepo.findOneBy({ id }))!;
  const contactInstance: Contact = contactRepo.create({ ...dbContact, ...contactPayload });
  await contactRepo.save(contactInstance);

  const contact: TContact = cS.contact.parse(contactInstance);

  return contact;
};

export const deleteContactService = async (contactId: string): Promise<any> => {
  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const id: string = contactId;
  const contact: Contact = (await contactRepo.findOneBy({ id }))!;

  await contactRepo.remove(contact);
};
