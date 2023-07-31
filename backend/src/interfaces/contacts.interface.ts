import { z } from 'zod';

import { DeepPartial } from 'typeorm';
import { contactSchemas as cS } from '../schemas';

export type TContact = z.infer<typeof cS.contact>;
export type TUserContactList = z.infer<typeof cS.userContactList>;
export type TContactList = z.infer<typeof cS.contactList>;
export type TContactPayload = z.infer<typeof cS.contactPayload>;
export type TContactUpdatePayload = DeepPartial<TContactPayload>;
