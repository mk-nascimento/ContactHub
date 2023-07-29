import { Router } from 'express';

import { contactsController as cCont } from '../controllers';
import { authMiddlewares as authMid, contactMiddlewares as cMid, serializer } from '../middlewares';
import { contactSchemas as cS } from '../schemas';

export const contactsRouter: Router = Router();

contactsRouter.post(
  '',
  authMid.isTokenValid,
  serializer.default(cS.contactPayload),
  cMid.isValidCellphone,
  cMid.isValidContactEmail,
  cCont.createContactsController
);
contactsRouter.get('', authMid.isTokenValid, authMid.isAdmin, cCont.listContactsController);
contactsRouter.get('/:id', authMid.isTokenValid, cMid.isValidContact, cCont.retrieveContactController);
contactsRouter.patch(
  '/:id',
  authMid.isTokenValid,
  serializer.default(cS.contactPartialPayload),
  cMid.isValidContact,
  cMid.isValidCellphone,
  cMid.isValidContactEmail,
  cCont.updateContactsController
);
contactsRouter.delete('/:id', cMid.isValidContact, cCont.deleteContactsController);
