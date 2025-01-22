import { Request, Response, NextFunction } from 'express';
import { infoLogger } from '../utils/logger';


// Middleware to log all incoming requests
const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  infoLogger.info(`Incoming request: ${method} ${url} - Body: ${JSON.stringify(body)}`);
  next(); // Pass control to the next middleware or route
};

export default logRequest;
