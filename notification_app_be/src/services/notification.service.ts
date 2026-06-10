import axios from 'axios';
import { ExternalNotification, ExternalApiResponse, NotificationType } from '../types';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';

const TYPE_WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const getHeaders = () => {
  const token = process.env.ACCESS_TOKEN;
  if (!token) throw new Error('ACCESS_TOKEN not configured');
  return { Authorization: `Bearer ${token}` };
};

const toInternal = (n: ExternalNotification) => ({
  id: n.ID,
  type: n.Type as NotificationType,
  title: n.Message,
  message: n.Message,
  created_at: n.Timestamp,
  read: false,
});

export const fetchNotifications = async (
  page: number,
  limit: number,
  notificationType?: string
) => {
  const params: Record<string, string | number> = { page, limit };
  if (notificationType) params.notification_type = notificationType;

  const { data } = await axios.get<ExternalApiResponse>(API_URL, {
    headers: getHeaders(),
    params,
  });

  return {
    notifications: data.notifications.map(toInternal),
    page,
    limit,
    total: 0,
  };
};

export const fetchAllNotifications = async (): Promise<ExternalNotification[]> => {
  const all: ExternalNotification[] = [];
  let page = 1;
  const limit = 10;

  while (true) {
    const { data } = await axios.get<ExternalApiResponse>(API_URL, {
      headers: getHeaders(),
      params: { page, limit },
    });
    if (!data.notifications || data.notifications.length === 0) break;
    all.push(...data.notifications);
    if (data.notifications.length < limit) break;
    page++;
  }

  return all;
};

const recencyScore = (ts: string): number => {
  const diffHrs = (Date.now() - new Date(ts).getTime()) / 3_600_000;
  return Math.max(0, 1 - diffHrs / 720);
};

export const getTopN = async (n: number) => {
  const all = await fetchAllNotifications();

  all.sort((a, b) => {
    const sa = (TYPE_WEIGHTS[a.Type] || 0) * 10 + recencyScore(a.Timestamp) * 5;
    const sb = (TYPE_WEIGHTS[b.Type] || 0) * 10 + recencyScore(b.Timestamp) * 5;
    if (sa !== sb) return sb - sa;
    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });

  return all.slice(0, n).map(toInternal);
};
