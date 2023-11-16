import { z } from 'zod';

export const contact = z.object({
  full_name: z.string().min(1, 'Campo não pode estar vazio').max(90),
  email: z.string().email('Campo dever ser um e-mail').max(45),
  phone: z.string().regex(/^\(\d{2}\)\s\d\s\d{4}\s\d{4}$/, 'Telefone deve acompanhar DDD e 9 dígitos'),
});
export const partialContact = contact.partial();

export type ContactPayload = z.infer<typeof partialContact>;
export type PartialContactPayload = z.infer<typeof partialContact>;
