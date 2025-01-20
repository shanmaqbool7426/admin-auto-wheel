
import ClientWrapper from '@/components/ClientWrapper';
import AllPosts from '@/modules/Blog/AllPosts';
// import { Suspense } from 'react';
const AllPostsPage = () => {
  return (
    <ClientWrapper>
      <AllPosts />
    </ClientWrapper>
  );
}

export default AllPostsPage;
