import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepo: ContactsRepository) {}

  async create(userId: string, createContactDto: CreateContactDto) {
    return await this.contactsRepo.create(userId, createContactDto);
  }

  async findMany() {
    return await this.contactsRepo.findMany();
  }

  async findUnique(id: string) {
    return await this.contactsRepo.findUnique(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact: Contact = await this.contactsRepo.findUnique(id);
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);

    return this.contactsRepo.update(id, updateContactDto);
  }

  async remove(id: string) {
    const contact: Contact = await this.contactsRepo.findUnique(id);
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);

    return await this.contactsRepo.remove(id);
  }
}
