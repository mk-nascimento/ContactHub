import { z } from 'zod';

export const user = z
  .object({
    full_name: z.string().nonempty('Campo não pode ser vazio').max(50),
    email: z.string().email('Campo deve ser email').max(45),
    phone: z.string().nonempty('Campo não pode ser vazio'),
    password: z.string().nonempty('Campo não pode ser vazio').max(120),
    confirm: z.string().nonempty('Campo não pode ser vazio').max(120),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas não coincidem',
    path: ['confirm'],
  });
export type UserData = z.infer<typeof user>;
