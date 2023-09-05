import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;

  full_name: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
  role: 'admin' | 'client';

  constructor() {
    this.id = randomUUID();
  }
}
