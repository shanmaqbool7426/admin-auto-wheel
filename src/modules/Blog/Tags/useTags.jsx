'use client';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import {
  useGetTagsQuery,
  useDeleteTagMutation,
  useDeleteMultipleTagsMutation,
  useUpdateTagMutation
} from '@/services/blog/tags';

export default function useTags() {
  // GET Tags data
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const initParams = {
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const { data: tagsData, isLoading, isFetching } = useGetTagsQuery(filterParams);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);

  // handle change sortOrder
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  // Delete bulk
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);
  const [deleteMultipleTags, { isLoading: loadingBulkDelete }] = useDeleteMultipleTagsMutation();

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

  const handleBulkDeleteTags = async () => {
    try {
      await deleteMultipleTags(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Tags deleted successfully.');
    } catch (error) {
      console.error('Error deleting comments:', error);
      errorSnackbar(error.data.message);
    }
  };

  // Delete Single
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteTag, { isLoading: loadingDelete }] = useDeleteTagMutation();

  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  }
  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenModalDelete(false);
  }
  const handleSubmitDelete = async () => {
    try {
      await deleteTag(selectedId).unwrap();
      successSnackbar('Category deleted successfully.');
      handleCloseModalDelete();
    } catch (error) {
      errorSnackbar(error?.data?.message);
    }
  };


  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation();

  const handleClickEditRow = (e, id) => {
    e.stopPropagation();
    const tagToEdit = tagsData?.data?.data.find(tag => tag._id === id);
    if (tagToEdit) {
      setSelectedTag({
        ...tagToEdit,
        id: tagToEdit._id
      });
      setIsTagModalOpen(true);
    }
  };

  const handleUpdateTag = async (values) => {
    try {
      await updateTag({
        id: selectedTag.id,
        ...values
      }).unwrap();

      successSnackbar('Tag updated successfully');

      setIsTagModalOpen(false);
      setSelectedTag(null);
    } catch (error) {
      errorSnackbar(error?.data?.message || 'Failed to update tag');
    }
  };

  return {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    tagsData,
    isLoading,
    isFetching,
    setSearchBy,
    filterParams,
    handleChangeFilter,

    // Delete Single
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleSubmitDelete,

    // Delete Bulk
    loadingBulkDelete,
    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteTags,


    isTagModalOpen,
    setIsTagModalOpen,
    selectedTag,
    setSelectedTag,

    handleClickEditRow,
    handleUpdateTag,
    isUpdating,
  };
}