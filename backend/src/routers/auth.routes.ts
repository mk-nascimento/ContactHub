import { Router } from 'express';

import { authController } from '../controllers';
import { serializer } from '../middlewares';
import { userSchemas as uS } from '../schemas';

export const authRouter: Router = Router();

authRouter.post('', serializer.default(uS.loginPayload), authController.default);
