import { Router } from 'express';
import { contactsController as cc } from '../controllers';
import { serializer } from '../middlewares';
import { contactSchemas as cs } from '../schemas';

export const contactsRouter: Router = Router();

contactsRouter.post('', serializer.default(cs.contactPayload), cc.createContactsController);
contactsRouter.get('', cc.listContactsController);
contactsRouter.get('/:id');
contactsRouter.patch('/:id', cc.updateContactsController);
contactsRouter.delete('/:id', cc.deleteContactsController);
