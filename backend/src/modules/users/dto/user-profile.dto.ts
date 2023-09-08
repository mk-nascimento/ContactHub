import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { User } from '../entities/user.entity';

export class UserProfile extends User {
  readonly id: string;
  readonly email: string;
  readonly full_name: string;
  readonly phone: string;
  readonly created_at: Date;
  readonly contacts: Contact[];
}
