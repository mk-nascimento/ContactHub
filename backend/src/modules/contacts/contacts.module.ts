import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsRepository } from './repositories/contacts.repository';
import { ContactsPrismaRepository } from './repositories/prisma/contacts.prisma.repository';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, PrismaService, { provide: ContactsRepository, useClass: ContactsPrismaRepository }],
})
export class ContactsModule {}
