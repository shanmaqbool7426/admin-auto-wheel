import ClientWrapper from '@/components/ClientWrapper';
import AllPosts from '@/modules/Blog/AllPosts';
import { Suspense } from 'react';
export default function AllPostsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWrapper>
        <AllPosts />
      </ClientWrapper>
    </Suspense>
  );
}
  