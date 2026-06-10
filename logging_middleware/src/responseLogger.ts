import { Request, Response, NextFunction } from 'express';
import { logInfo } from './logger';

export const responseLogger = (req: Request, res: Response, next: NextFunction): void => {
  const originalSend = res.send.bind(res);
  res.send = function (body: unknown): Response {
    logInfo(`RES ${req.method} ${req.originalUrl} ${res.statusCode}`);
    return originalSend(body);
  } as typeof res.send;
  next();
};
