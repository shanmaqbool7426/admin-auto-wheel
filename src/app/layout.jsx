import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import ClientLayout from './ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning>
          <ClientLayout>
            {children}
          </ClientLayout>
      </body>
    </html>
  );
}
