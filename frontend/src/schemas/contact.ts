import { z } from 'zod';

export const contact = z.object({
  full_name: z.string().nonempty('Campo não pode estar vazio').max(90),
  email: z.string().email('Campo dever ser um e-mail').max(45),
  phone: z.string().nonempty('Campo não pode estar vazio').max(15),
});
export const partialContact = contact.partial();

export type ContactPayload = z.infer<typeof partialContact>;
