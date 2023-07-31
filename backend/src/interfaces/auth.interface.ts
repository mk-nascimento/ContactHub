import { z } from 'zod';
import { userSchemas as uS } from '../schemas';

export type TLoginPayload = z.infer<typeof uS.loginPayload>;
export type TToken = { token: string };
