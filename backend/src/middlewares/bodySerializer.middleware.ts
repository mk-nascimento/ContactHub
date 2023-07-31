import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

const bodySerializer =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export default bodySerializer;
