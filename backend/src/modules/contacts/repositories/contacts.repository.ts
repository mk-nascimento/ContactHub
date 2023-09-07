import { Prisma } from '@prisma/client';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract findDuplicate(user_id: string, data: CreateContactDto): Promise<Contact | undefined>;

  abstract create(user_id: string, data: CreateContactDto): Promise<Contact>;

  abstract findMany(where?: Prisma.ContactFindManyArgs): Promise<Contact[]>;

  abstract findUnique(id: string): Promise<Contact | undefined>;

  abstract update(id: string, data: UpdateContactDto): Promise<Contact>;

  abstract remove(id: string): Promise<void>;
}
