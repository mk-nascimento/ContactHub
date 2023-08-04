import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

/**
 * Middleware factory function to create a body serializer middleware.
 * The body serializer middleware validates and parses the request body against the provided schema.
 * If the body does not conform to the schema, an error will be thrown.
 *
 * @param {ZodTypeAny} schema - The Zod schema to validate the request body against.
 * @returns {Function} - The body serializer middleware function.
 */
const bodySerializer =
  (schema: ZodTypeAny): Function =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export default bodySerializer;
