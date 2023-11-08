import { z } from 'zod';

export const info = z.object({
  full_name: z.string().min(1, 'Campo não pode ser vazio').max(50),
  email: z.string().email('Campo deve ser email').max(45),
  phone: z.string().regex(/^\(\d{2}\)\s\d\s\d{4}\s\d{4}$/, 'Telefone deve acompanhar DDD e 9 dígitos'),
});

const infoWithPass = info.merge(
  z.object({
    password: z.string().min(5, 'Mínimo 5 caracteres').max(120),
    confirm: z.string().min(5, 'Mínimo 5 caracteres').max(120),
  }),
);

export const user = infoWithPass.refine(({ password, confirm }) => password === confirm, {
  message: 'Senhas não coincidem',
  path: ['confirm'],
});

export const password = z
  .object({
    current: z.string().min(5, 'Mínimo 5 caracteres').max(120),
    password: z.string().min(5, 'Mínimo 5 caracteres').max(120),
    confirm: z.string().min(5, 'Mínimo 5 caracteres').max(120),
  })
  .refine(({ confirm, current }) => confirm !== current, {
    message: 'Nova senha deve ser diferente da atual',
    path: ['password'],
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas não coincidem',
    path: ['confirm'],
  });

export type UserData = z.infer<typeof user>;
export type UserInfoData = z.infer<typeof info>;
export type Password = z.infer<typeof password>;
