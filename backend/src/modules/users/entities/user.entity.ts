import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;

  full_name: string;
  email: string;
  phone: string;
  created_at: Date;

  @Exclude()
  role: 'admin' | 'client';

  @Exclude()
  password: string;
}
