'use client'
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from '@/theme';
import {
  MantineProvider,
  ColorSchemeScript
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import StoreProvider from '@/store/StoreProvider';

export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning>
        <StoreProvider>
          <MantineProvider 
            theme={theme} 
            defaultColorScheme="light"
          >
            <Notifications />
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
  