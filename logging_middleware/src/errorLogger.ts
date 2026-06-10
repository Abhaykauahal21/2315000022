import { Request, Response, NextFunction } from 'express';
import { logError } from './logger';

export const errorLogger = (err: Error, req: Request, _res: Response, next: NextFunction): void => {
  logError(`ERR ${req.method} ${req.originalUrl} - ${err.message}`);
  next(err);
};
