import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async findDuplicate(user_id: string, { email, full_name, phone }: CreateContactDto) {
    return await this.prisma.contact.findFirst({ where: { AND: [{ OR: [{ email }, { full_name }, { phone }] }, { user_id }] } });
  }

  async create(user_id: string, data: CreateContactDto): Promise<Contact> {
    const instance = new Contact();
    Object.assign(instance, data);

    const contact: Contact = await this.prisma.contact.create({ data: { ...instance, user_id } });

    return plainToInstance(Contact, contact);
  }

  async findMany(args?: Prisma.ContactFindManyArgs): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany({ ...args });

    return plainToInstance(Contact, contacts);
  }

  async findUnique(id: string): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.findUnique({ where: { id } });

    return plainToInstance(Contact, contact);
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.update({ where: { id }, data });

    return plainToInstance(Contact, contact);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.contact.delete({ where: { id } });
  }
}
