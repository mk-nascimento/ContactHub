export interface Contact {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  user_id: string;
}

export interface ContactData extends Partial<Contact> {}
