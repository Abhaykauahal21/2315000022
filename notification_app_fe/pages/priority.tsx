'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Slider,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import NotificationCard from '../components/NotificationCard';
import { getPriorityNotifications } from '../services/api';
import { PriorityResponse, Notification } from '../types';

export default function PriorityInboxPage() {
  const [data, setData] = useState<PriorityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [n, setN] = useState(10);
  const [slider, setSlider] = useState(10);
  const [viewed, setViewed] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPriorityNotifications(n);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [n]);

  useEffect(() => { load() }, [load]);

  const notifications: Notification[] = data
    ? data.notifications.map((notif) => ({ ...notif, read: viewed[notif.id] ?? notif.read }))
    : [];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#fff' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <StarIcon color="secondary" />
          <Typography variant="h5">Priority Inbox</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Top-ranked notifications by type priority and recency
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, bgcolor: '#fff' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
        >
          <Stack direction="row" spacing={1} alignItems="center" minWidth={120}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              Show top
            </Typography>
            <Chip label={slider} color="primary" size="small" sx={{ fontWeight: 700, minWidth: 32 }} />
          </Stack>
          <Slider
            value={slider}
            onChange={(_, v) => setSlider(v as number)}
            min={1}
            max={50}
            sx={{ maxWidth: 240, mx: { xs: 0, sm: 1 } }}
          />
          <TextField
            type="number"
            size="small"
            value={slider}
            onChange={(e) => setSlider(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
            inputProps={{ min: 1, max: 50, style: { textAlign: 'center' } }}
            sx={{ width: 70 }}
          />
          <Button
            variant="contained"
            onClick={() => setN(slider)}
            disabled={loading}
            sx={{ px: 3, whiteSpace: 'nowrap' }}
          >
            {loading ? 'Loading...' : 'Apply'}
          </Button>
        </Stack>
      </Paper>

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
            No priority notifications
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Try increasing the N value
          </Typography>
        </Paper>
      )}

      {notifications.map((notif) => (
        <NotificationCard
          key={notif.id}
          notification={notif}
          onToggle={(id) => setViewed((prev) => ({ ...prev, [id]: !prev[id] }))}
        />
      ))}

      {data && !loading && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Chip
            label={`Showing ${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      )}
    </Box>
  );
}
