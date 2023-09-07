import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from 'src/enums';
import { ITokenUser } from 'src/interfaces';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepo: ContactsRepository) {}

  private checkPermission(user: ITokenUser, user_id: string) {
    if (user.id !== user_id && user.role !== UserRole.Admin) throw new ForbiddenException('Insufficient Permission');
  }

  private async checkDuplicated(userId: string, createContactDto: CreateContactDto) {
    const duplicate = await this.contactsRepo.findDuplicate(userId, createContactDto);

    if (duplicate) throw new ConflictException('Contact already exists');
  }

  async create(userId: string, createContactDto: CreateContactDto) {
    await this.checkDuplicated(userId, createContactDto);

    return await this.contactsRepo.create(userId, createContactDto);
  }

  async findMany(user: ITokenUser) {
    if (user.role === UserRole.Admin) return await this.contactsRepo.findMany();

    return await this.contactsRepo.findMany({ where: { user_id: user.id } });
  }

  async findUnique(tokenUser: ITokenUser, id: string) {
    const contact: Contact = await this.contactsRepo.findUnique(id);

    this.checkPermission(tokenUser, contact.user_id);
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);

    return contact;
  }

  async update(tokenUser: ITokenUser, id: string, updateContactDto: UpdateContactDto) {
    const contact: Contact = await this.contactsRepo.findUnique(id);

    this.checkPermission(tokenUser, contact.user_id);
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);

    return this.contactsRepo.update(id, updateContactDto);
  }

  async remove(tokenUser: ITokenUser, id: string) {
    const contact: Contact = await this.contactsRepo.findUnique(id);

    this.checkPermission(tokenUser, contact.user_id);
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);

    return await this.contactsRepo.remove(id);
  }
}
