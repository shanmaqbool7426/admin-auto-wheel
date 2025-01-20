import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading'; // Create this if you haven't

// Dynamically import the Files component with no SSR
const Files = dynamic(() => import('@/modules/FileManager/Files'), {
  ssr: false,
  loading: () => <Loading />
});

// Mark the page component as a Client Component
export default function FileManagerPage() {
  return <Files />;
}

