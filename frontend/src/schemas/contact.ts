import { z } from 'zod';

export const contact = z.object({
  name: z.string().nonempty('Campo não pode estar vazio').max(90),
  email: z.string().email('Campo dever ser um e-mail').max(45),
  cellphone: z.string().nonempty('Campo não pode estar vazio').max(15),
});
export const partialContact = contact.partial();

export type ContactPayload = z.infer<typeof partialContact>;
