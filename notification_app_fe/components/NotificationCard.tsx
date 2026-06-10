'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Work,
  Assessment,
  Event,
  MarkEmailRead,
  MarkEmailUnread,
  AccessTime,
} from '@mui/icons-material';
import { Notification, NotificationType } from '../types';

interface Props {
  notification: Notification;
  onToggle: (id: string) => void;
}

const config: Record<NotificationType, { color: 'primary' | 'success' | 'warning'; label: string; bg: string; icon: React.ReactElement }> = {
  [NotificationType.Placement]: { color: 'primary', label: 'Placement', bg: '#e3f2fd', icon: <Work fontSize="small" /> },
  [NotificationType.Result]: { color: 'success', label: 'Result', bg: '#e8f5e9', icon: <Assessment fontSize="small" /> },
  [NotificationType.Event]: { color: 'warning', label: 'Event', bg: '#fff3e0', icon: <Event fontSize="small" /> },
};

const fmtDate = (d: string) => {
  const date = new Date(d);
  const now = new Date();
  const diffHrs = Math.floor((now.getTime() - date.getTime()) / 3_600_000);
  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffHrs < 48) return 'Yesterday';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default function NotificationCard({ notification, onToggle }: Props) {
  const cfg = config[notification.type];
  const isRead = notification.read;

  return (
    <Card
      sx={{
        mb: 2,
        opacity: isRead ? 0.65 : 1,
        bgcolor: isRead ? 'grey.50' : '#fff',
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Chip
                icon={cfg.icon}
                label={cfg.label}
                color={cfg.color}
                size="small"
                variant={isRead ? 'outlined' : 'filled'}
                sx={{
                  fontWeight: 600,
                  bgcolor: isRead ? 'transparent' : cfg.bg,
                }}
              />
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTime sx={{ fontSize: 13, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 500 }}>
                  {fmtDate(notification.created_at)}
                </Typography>
              </Stack>
            </Stack>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, lineHeight: 1.3, mb: 0.5 }}
            >
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {notification.message}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => onToggle(notification.id)}
            sx={{
              mt: -0.5,
              mr: -0.5,
              color: isRead ? 'text.disabled' : `${cfg.color}.main`,
            }}
          >
            {isRead ? <MarkEmailRead /> : <MarkEmailUnread />}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
