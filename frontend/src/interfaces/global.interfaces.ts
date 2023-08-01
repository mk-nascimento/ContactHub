export interface Contact {
  id: string;
  full_name: string;
  email: string;
  cellphone: string;
  created_at: Date;
}

export interface ContactData extends Partial<Contact> {}
