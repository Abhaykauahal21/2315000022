'use client';

import React from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

interface Props {
  page: number;
  hasMore: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationBar({ page, hasMore, onPrev, onNext }: Props) {
  return (
    <Paper elevation={0} sx={{ display: 'inline-flex', mx: 'auto', mt: 3, borderRadius: 3, bgcolor: '#fff' }}>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ px: 0.5, py: 0.5 }}>
        <Button
          size="small"
          disabled={page <= 1}
          onClick={onPrev}
          startIcon={<ChevronLeft />}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Prev
        </Button>
        <Typography
          variant="body2"
          sx={{ px: 2, fontWeight: 600, color: 'text.secondary' }}
        >
          Page {page}
        </Typography>
        <Button
          size="small"
          disabled={!hasMore}
          onClick={onNext}
          endIcon={<ChevronRight />}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Next
        </Button>
      </Stack>
    </Paper>
  );
}
