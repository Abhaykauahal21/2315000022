import { Request, Response, NextFunction } from 'express';
import { logInfo } from './logger';

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  logInfo(`REQ ${req.method} ${req.originalUrl}`);
  next();
};
