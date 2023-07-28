import { Router } from 'express';
import { usersController as uc } from '../controllers';
import { serializer } from '../middlewares';
import { userSchemas as s } from '../schemas';

export const usersRouter: Router = Router();

usersRouter.post('', serializer.default(s.userPayload), uc.createUserController);
usersRouter.get('', uc.listUsersController);
usersRouter.get('/:id');
usersRouter.patch('/:id', uc.updateUserController);
usersRouter.delete('/:id', uc.deleteUserController);
