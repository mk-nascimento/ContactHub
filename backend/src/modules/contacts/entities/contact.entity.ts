import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;

  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  user_id: string;

  constructor() {
    this.id = randomUUID();
  }
}
