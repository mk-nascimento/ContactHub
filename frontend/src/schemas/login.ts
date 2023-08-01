import { z } from 'zod';

export const login = z.object({ email: z.string().email('Campo obrigatório'), password: z.string().nonempty('Campo obrigatório') });
export type LoginData = z.infer<typeof login>;
