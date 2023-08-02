import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddlewares as authMid, serializer } from '../middlewares';
import { userSchemas as uS } from '../schemas';

export const authRouter: Router = Router();

authRouter.post('/login', serializer.default(uS.loginPayload), authController.default);
authRouter.get('/validate', authMid.isTokenValid, (_, res) => res.send());
