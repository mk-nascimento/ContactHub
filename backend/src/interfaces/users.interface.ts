import { z } from 'zod';

import { DeepPartial } from 'typeorm';
import { userSchemas as uS } from '../schemas';

export type TUser = z.infer<typeof uS.user>;
export type TUserResponse = z.infer<typeof uS.userResponse>;
export type TUserListResponse = z.infer<typeof uS.usersList>;
export type TUserPayload = z.infer<typeof uS.userPayload>;

type TUserUpdate = z.infer<typeof uS.userUpdate>;
export type TUserUpdatePayload = DeepPartial<TUserUpdate>;
