import React from 'react';
import EmailLayout from '@/layouts/EmailLayout';

export default function EmailPageLayout({ children }) {
  return (
    <EmailLayout>
      {children}
    </EmailLayout>
  )
}
