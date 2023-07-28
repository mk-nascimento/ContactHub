import { z } from 'zod';

import { DeepPartial } from 'typeorm';
import { contactSchemas as cs } from '../schemas';

export type TContact = z.infer<typeof cs.contact>;
export type TContactList = z.infer<typeof cs.contactList>;
export type TContactPayload = z.infer<typeof cs.contactPayload>;

type TContactUpdate = z.infer<typeof cs.contactUpdate>;
export type TContactUpdatePayload = DeepPartial<TContactUpdate>;
