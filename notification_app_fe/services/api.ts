import { ApiResponse, PriorityResponse } from '../types';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getNotifications = async (
  page = 1,
  limit = 10,
  type?: string
): Promise<ApiResponse> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (type) params.set('notification_type', type);

  const res = await fetch(`${BASE}/notifications?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const getPriorityNotifications = async (n = 10): Promise<PriorityResponse> => {
  const res = await fetch(`${BASE}/priority?n=${n}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};
