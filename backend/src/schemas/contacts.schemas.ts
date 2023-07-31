import { z } from 'zod';
import { userResponse } from './users.schemas';

export const contact = z.object({
  id: z.string().uuid(),
  full_name: z.string().max(90),
  email: z.string().email().max(45),
  cellphone: z.string().max(15),
  created_at: z.string(),
});

export const userContactList = contact.array();
export const contactList = contact.extend({ user: userResponse.nullable() }).array();
export const contactPayload = contact.omit({ id: true, created_at: true });
export const contactPartialPayload = contactPayload.partial();
