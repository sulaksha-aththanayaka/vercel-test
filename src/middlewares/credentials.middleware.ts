
import { NextFunction, Request, Response } from 'express';
import { allowOrigins } from '../config/allowedOrigins';

const credentials = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin as string | undefined;
  if (origin && allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export default credentials;
