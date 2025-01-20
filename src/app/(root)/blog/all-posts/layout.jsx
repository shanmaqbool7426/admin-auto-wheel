import React from 'react';
import AllPostsLayout from '@/layouts/AllPostsLayout';

export default function PostsLayout({ children }) {
  return (
    <AllPostsLayout>
      {children}
    </AllPostsLayout>
  )
}
