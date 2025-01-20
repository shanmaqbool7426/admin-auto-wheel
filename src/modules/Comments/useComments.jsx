'use client';
import React, { useState, useEffect } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetCommentsQuery,
  useDeleteBulkCommentsMutation,
} from '@/services/comments';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import { useParams } from 'next/navigation';

export default function useComments() {
  const { activeTab } = useParams();
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const initParams = {
    status: 'all',
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const { data, isLoading, isFetching, isError } = useGetCommentsQuery(filterParams);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, status: activeTab }));
  }, [activeTab]);

  // handle change sortOrder
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  // handle delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState();
  const [deleteBulkComments, { isLoading: loadingBulkDelete }] = useDeleteBulkCommentsMutation();

  const handleOpenDeleteModal = (id) => {
    setCommentId(id)
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteBulkComments([commentId]).unwrap();
      handleCloseDeleteModal();
      successSnackbar('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comments:', error);
      errorSnackbar(error.data.message);
    }
  };

  // handle bulk action
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);
  const handleOpenBulkDeleteModal = () => {
    setOpenBulkDeleteModal(true);
  };

  const handleCloseBulkDeleteModal = () => {
    setOpenBulkDeleteModal(false);
  };

  const handleBulkAction = async (action) => {
    if (action === 'delete') {
      handleOpenBulkDeleteModal();
    }
  };

  const handleBulkDeleteComments = async () => {
    try {
      await deleteBulkComments(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Comments deleted successfully.');
    } catch (error) {
      console.error('Error deleting comments:', error);
      errorSnackbar(error.data.message);
    }
  };

  return {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    isError,
    isLoading,
    isFetching,
    data,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    loadingBulkDelete,
    handleDeleteComment,
    openBulkDeleteModal,
    handleOpenBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteComments,
  };
}
