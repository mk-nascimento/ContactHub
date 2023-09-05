import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [UsersModule, ContactsModule],
})
export class AppModule {}
