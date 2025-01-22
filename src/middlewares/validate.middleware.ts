import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ERROR, VALIDATION_ERROR } from '../utils/response.helper';

export const validate = (schema: ZodSchema, source: 'body' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if source is 'body' or 'query' and validate accordingly
      const dataToValidate = source === 'body' ? req.body : req.query;
      console.log(dataToValidate)
      schema.parse(dataToValidate);  // This will validate the data against the provided Zod schema
      next();  // Proceed to the next middleware if validation passes
    } catch (error) {
      VALIDATION_ERROR(res, error);
    }
  };
};
