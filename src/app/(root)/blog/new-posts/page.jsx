import React from 'react';
import NewPost from '@/modules/Blog/NewPost';
import ClientWrapper from '@/components/ClientWrapper';

export default function NewPostPage() {
  return (
    <ClientWrapper>
      <NewPost />
    </ClientWrapper>
  );
}