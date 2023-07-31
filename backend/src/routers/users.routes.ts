import { Router } from 'express';

import { contactsController as cCont, usersController as uCont } from '../controllers';
import { authMiddlewares as authMid, serializer, userMiddlewares as uMid } from '../middlewares';
import { userSchemas as uS } from '../schemas';

export const usersRouter: Router = Router();

usersRouter.post('', serializer.default(uS.userPayload), uMid.isValidUserEmail, uCont.createUserController);
usersRouter.get('', authMid.isTokenValid, authMid.isAdmin, uCont.listUsersController);
usersRouter.get('/:id', authMid.isTokenValid, authMid.isOwnerOrAdmin, uMid.isValidUser, uCont.retrieveUserController);
usersRouter.patch(
  '/:id',
  authMid.isTokenValid,
  authMid.isOwnerOrAdmin,
  uMid.isValidUser,
  serializer.default(uS.userPartialUpdate),
  uMid.isValidUserEmail,
  uCont.updateUserController
);
usersRouter.delete('/:id', uMid.isValidUser, uCont.deleteUserController);

usersRouter.get('/:id/contacts', authMid.isTokenValid, uMid.isValidUser, cCont.listContactsController);
