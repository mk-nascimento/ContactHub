import { z } from 'zod';

export const register = z
  .object({
    name: z.string().nonempty('Campo não pode ser vazio').max(50),
    email: z.string().email('Campo deve ser email').max(45),
    password: z.string().nonempty('Campo não pode ser vazio').max(120),
    confirm: z.string().nonempty('Campo não pode ser vazio').max(120),
  })
  .refine(({ password, confirm }) => password === confirm, { message: 'Senhas não coincidem', path: ['confirm'] });
export type RegisterData = z.infer<typeof register>;
