'use client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import StoreProvider from '@/store/StoreProvider';
import { theme } from '@/theme';

export default function ClientLayout({ children }) {
  return (
    <StoreProvider>
      <MantineProvider 
        theme={theme} 
        defaultColorScheme="light"
      >
        <Notifications />
        {children}
      </MantineProvider>
    </StoreProvider>
  );
} 