import { z } from 'zod';

export const contact = z.object({
  id: z.string().uuid(),
  full_name: z.string().max(90),
  email: z.string().email().max(45),
  cellphone: z.string().max(15),
  created_at: z.string(),
  user_id: z.number(),
});

export const contactList = contact.array();
export const contactPayload = contact.omit({ id: true, created_at: true, user_id: true });
export const contactUpdate = contactPayload.pick({ full_name: true, email: true, cellphone: true });
