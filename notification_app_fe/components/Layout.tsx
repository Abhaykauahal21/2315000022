'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import { useRouter, usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const tab = pathname === '/priority' ? 1 : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        }}
      >
        <Toolbar>
          <NotificationsActiveIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.01em' }}>
            CampusHub
          </Typography>
          <Paper elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => router.push(v === 0 ? '/' : '/priority')}
              textColor="inherit"
              sx={{
                '& .MuiTab-root': { minHeight: 48, py: 0.5, fontWeight: 600 },
                '& .MuiTabs-indicator': { bgcolor: 'secondary.main', height: 3, borderRadius: 1 },
              }}
            >
              <Tab icon={<InboxIcon sx={{ fontSize: 20 }} />} label="All Notifications" />
              <Tab icon={<StarIcon sx={{ fontSize: 20 }} />} label="Priority Inbox" />
            </Tabs>
          </Paper>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
