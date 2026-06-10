'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationBar from '../components/PaginationBar';
import { getNotifications } from '../services/api';
import { ApiResponse, Notification } from '../types';

export default function AllNotificationsPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const [viewed, setViewed] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const type = filter === 'All' ? undefined : filter;
      const res = await getNotifications(page, 10, type);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => { load() }, [load]);

  const notifications: Notification[] = data
    ? data.notifications.map((n) => ({ ...n, read: viewed[n.id] ?? n.read }))
    : [];

  const hasMore = data ? data.notifications.length >= data.limit : false;

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#fff' }}>
        <Typography variant="h5" gutterBottom>
          All Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse and filter campus notifications
        </Typography>
      </Paper>

      <FilterBar value={filter} onChange={(v) => { setFilter(v); setPage(1) }} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={40} thickness={3} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#fff' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No notifications found
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Try selecting a different filter
          </Typography>
        </Paper>
      )}

      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          onToggle={(id) => setViewed((prev) => ({ ...prev, [id]: !prev[id] }))}
        />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationBar
          page={page}
          hasMore={hasMore}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      </Box>
    </Box>
  );
}
