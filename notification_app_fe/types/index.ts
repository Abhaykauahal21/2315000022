export enum NotificationType {
  Placement = 'Placement',
  Result = 'Result',
  Event = 'Event',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface ApiResponse {
  notifications: Notification[];
  page: number;
  limit: number;
  total: number;
}

export interface PriorityResponse {
  notifications: Notification[];
  count: number;
}
