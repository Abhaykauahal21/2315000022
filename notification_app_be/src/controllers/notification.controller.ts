import { Request, Response, NextFunction } from 'express';
import { fetchNotifications, getTopN } from '../services/notification.service';

export const getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.notification_type as string | undefined;
    const data = await fetchNotifications(page, limit, type);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getPriorityNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const n = parseInt(req.query.n as string) || 10;
    const notifications = await getTopN(n);
    res.json({ notifications, count: notifications.length });
  } catch (err) {
    next(err);
  }
};
