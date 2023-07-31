import { Request, Response } from 'express';

import { TToken } from '../interfaces/auth.interface';
import { createTokenService } from '../services/auth.service';

const authController = async (req: Request, res: Response): Promise<Response> => {
  const token: TToken = await createTokenService(req.body);

  return res.json(token);
};

export default authController;
