'use client';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useGetPostsQuery } from '@/services/blog/posts';
import { useRouter } from 'next/navigation';
import { PATH_NAME } from '@/constants/pathname'
import { useGetUsersQuery } from '@/services/user-management';
import { useGetConversationsListQuery } from '@/services/chat';

export default function useChat() {
  const router = useRouter();
  const { data, error, isLoading } = useGetUsersQuery();
  const { data: conversationsList, error: conversationsError, isLoading: conversationsLoading } = useGetConversationsListQuery();

  const [searchBy, setSearchBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filterParams, setFilterParams] = useState({
    actions: '',
    news: '',
    date: '',
  });

  useEffect(() => {
    if (data) {
      setUsers(data?.data?.users);
    }
  }, [data]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickExternalLink = (e, id) => {
    e.stopPropagation();
    router.push(`${PATH_NAME.CHAT}/${id}`)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // You'll need to update your query to handle pagination
  };


  return {
    setSearchBy,
    conversationsList,
    filterParams,
    handleChangeFilter,
    handleClickExternalLink,
    users,
    isLoading,
    error,
    currentPage,
    totalPages: data?.totalPages || 1,
    handlePageChange,
    totalUsers: data?.totalUsers || 0,
    filters: data?.filters || {},
  };
}