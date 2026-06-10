import { Request, Response, NextFunction } from 'express';
import { logInfo } from './logger';

export const executionTimeLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    logInfo(`TIME ${req.method} ${req.originalUrl} ${ms.toFixed(2)}ms`);
  });
  next();
};
