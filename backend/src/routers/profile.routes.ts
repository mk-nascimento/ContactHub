import { Router } from 'express';

import { usersController as uCont } from '../controllers';
import { authMiddlewares as authMid } from '../middlewares';

export const profileRouter: Router = Router();

profileRouter.get('', authMid.isTokenValid, uCont.retrieveProfileController);
