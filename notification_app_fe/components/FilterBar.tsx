'use client';

import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Paper } from '@mui/material';
import { NotificationType } from '../types';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const options = [
  { label: 'All', value: 'All' },
  { label: 'Placement', value: NotificationType.Placement },
  { label: 'Result', value: NotificationType.Result },
  { label: 'Event', value: NotificationType.Event },
];

export default function FilterBar({ value, onChange }: Props) {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ bgcolor: '#fff', borderRadius: 3, p: 0.5 }}>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={(_, v) => v && onChange(v)}
          color="primary"
          size="small"
          sx={{
            gap: 0.5,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: 2.5,
              px: 2.5,
              py: 0.75,
              fontWeight: 600,
              color: 'text.secondary',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' },
              },
            },
          }}
        >
          {options.map((o) => (
            <ToggleButton key={o.value} value={o.value}>
              {o.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
}
