import { z } from 'zod';

export const user = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
  email: z.string().email().max(45),
  password: z.string().max(120).min(8),
  created_at: z.string(),
  role: z.enum(['admin', 'client']).default('client'),
});

export const userPayload = user.omit({ id: true, created_at: true, role: true });
export const userResponse = user.omit({ password: true });
export const usersList = userResponse.array();
export const userUpdate = userPayload.pick({ name: true, email: true, password: true });
export const userPartialUpdate = userUpdate.partial();

export const loginPayload = user.pick({ email: true, password: true });
