'use client'
import React, { useEffect } from 'react';
import { Box, Grid, LoadingOverlay, Group, Button } from '@mantine/core';
import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using React Router
import useNewPost from './useNewPost';
// import PostCard from './components/PostCard';
import PostSummary from './components/PostSummary';
import PostCategories from './components/PostCategories';
import FeaturedImage from './components/FeaturedImage';
import PageLoader from '@/components/PageLoader';
import { generateSlug } from '@/utils/helpers';

export default function NewPost() {
  const router = useRouter();
  const {
    form,
    handleSubmit,
    isLoading,
    catgData,
    tagsData,
    isEdit,
    loadingPostDetails
  } = useNewPost();

  // Handle unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (form.isDirty()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form]);

  const handleCancel = () => {
    if (form.isDirty() && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    router.push('/posts');
  };
  console.log(" ", form.values);

  // const handleSubmit = async (formData) => {
  //   try {
  //     // Check if content exists and has blocks
  //     if (!formData.content || !formData.content.blocks || formData.content.blocks.length === 0) {
  //       throw new Error('Content is required');
  //     }

  //     // Make sure content has actual data
  //     const hasContent = formData.content.blocks.some(block => 
  //       block.data && Object.keys(block.data).length > 0
  //     );

  //     if (!hasContent) {
  //       throw new Error('Content is required');
  //     }

  //     // Your API call here
  //     await submitPost(formData);
      
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //     // Handle error (show notification, etc.)
  //   }
  // };

  return (
    // <ErrorBoundary>
    <Box>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="30px">
          <Grid.Col span={8}>
            {/* <PostCard
              form={form}
              isLoading={isLoading}
              isEdit={isEdit}
            /> */}
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid gutter="30px">
              <Grid.Col span={12}>
                <PostSummary form={form} />
              </Grid.Col>
              <Grid.Col span={12}>
                <PostCategories
                  form={form}
                  categoriesData={catgData}
                  tagsData={tagsData}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <FeaturedImage
                  form={form}
                  isEdit={isEdit}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </form>
      {loadingPostDetails && <PageLoader height={'calc(100vh - 80px)'} />}
    </Box>
    // </ErrorBoundary>
  );
}