'use client';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useSearchPostsQuery,
  useDeleteMultiplePostMutation,
  useDuplicatePostMutation,
  useDuplicateMultiplePostMutation,
  useGetStatusCountsQuery,
} from '@/services/blog/posts';
import { PAGE_SIZE } from '@/constants/pagination';
import { useRouter } from 'next/navigation';
import { PATH_NAME } from '@/constants/pathname';
import { useGetCategoriesQuery } from '@/services/blog/categories';


export default function useAllPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: getCategoriesData } = useGetCategoriesQuery();
  const catgData = getCategoriesData?.data?.data?.map(catg => ({ value: catg?.name, label: catg?.name })) || [];
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    actions: '',
    news: '',
    date: '',
  });

  const [deleteMultiplePost] = useDeleteMultiplePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [duplicatePost] = useDuplicatePostMutation();
  const [duplicateMultiplePost] = useDuplicateMultiplePostMutation();

  // Search query parameters
  const searchParams = {
    visibility: '',
    categories: filterParams.news || undefined,
    sortBy: 'publishDate',
    sortOrder: filterParams.date === 'oldToNew' ? 'asc' : 'desc',
    page,
    limit: PAGE_SIZE,
    query: searchBy || undefined,
  };

  const { data: postsData, isLoading: loadingPosts, isFetching: fetchingPosts, error } = useSearchPostsQuery(searchParams);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickEditRow = (id) => {
    router.push(`${PATH_NAME.BLOG_NEW_POSTS}?id=${id}`);
  }

  const handleClickDeleteRow = (e, id) => {
    e.stopPropagation();
    deletePost(id)
  }

  const handleClickDuplicate = (e, id) => {
    e.stopPropagation();
    duplicatePost(id)
  }

  const handleSelectAll = (checked, posts) => {
    if (checked) {
      setSelectedRows(posts.map(post => post._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleBulkAction = async (action) => {
    if (action === 'delete' && selectedRecords.length > 0) {
      try {
        // if (window.confirm(`Are you sure you want to delete ${selectedRows.length} selected posts?`)) {
        //   await Promise.all(selectedRows.map(id => deletePost(id)));
        //   setSelectedRows([]); // Clear selection after deletion
        // }
        const ids = selectedRecords.map((item) => item.id)
        await deleteMultiplePost(ids)
      } catch (error) {
        console.error('Error deleting posts:', error);
      }
    }
    else if (action === 'duplicate' && selectedRecords.length > 0) {
      const ids = selectedRecords.map((item) => item.id)
      await duplicateMultiplePost(ids)
    }
  };

  const { data: statusCountsData } = useGetStatusCountsQuery()

  const handleNavigateNewPost = () => {
    try {
      router.push(PATH_NAME.BLOG_NEW_POSTS);
    } catch (error) {
      console.error('Error navigating to new post:', error);
    }
  };

  return {
    page,
    setPage,
    catgData,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    handleChangeFilter,

    handleClickEditRow,
    handleClickDeleteRow,
    handleClickDuplicate,
    handleSelectAll,
    handleBulkAction,
    statusCountsData,
    posts: postsData?.data?.blogs.map(post => ({ ...post, id: post._id })) || [],
    totalPosts: postsData?.data?.total || 0,
    loadingPosts,
    fetchingPosts,
    error,
    handleNavigateNewPost,
  };
}
