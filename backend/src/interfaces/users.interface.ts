import { z } from 'zod';

import { DeepPartial } from 'typeorm';
import { userSchemas as us } from '../schemas';

export type TUser = z.infer<typeof us.user>;
export type TUserResponse = z.infer<typeof us.userResponse>;
export type TUserListResponse = z.infer<typeof us.usersList>;
export type TUserPayload = z.infer<typeof us.userPayload>;

type TUserUpdate = z.infer<typeof us.userUpdate>;
export type TUserUpdatePayload = DeepPartial<TUserUpdate>;
