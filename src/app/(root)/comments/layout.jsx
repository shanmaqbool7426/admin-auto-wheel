import React from 'react';
import CommentsLayout from '@/layouts/CommentsLayout';

export default function CommentsPageLayout({ children }) {
  return (
    <CommentsLayout>
      {children}
    </CommentsLayout>
  )
}
