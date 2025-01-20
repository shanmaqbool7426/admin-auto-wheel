'use client';
import { Suspense } from 'react';
import { LoadingOverlay } from '@mantine/core';

export default function ClientWrapper({ children }) {
  return (
    <Suspense fallback={<LoadingOverlay visible={true} />}>
      {children}
    </Suspense>
  );
} 