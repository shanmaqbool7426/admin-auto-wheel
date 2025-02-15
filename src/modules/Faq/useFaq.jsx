'use client';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useGetFaqsQuery, useDeleteFaqMutation } from '@/services/faq';
import { PAGE_SIZE } from '@/constants/pagination';

export default function useFaq() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    type: '',
    page: 1,
    limit: PAGE_SIZE,
    search: '',
  });

  const { data: faqData, isLoading, isFetching } = useGetFaqsQuery(filterParams);
  const [deleteFaq, { isLoading: loadingDelete }] = useDeleteFaqMutation();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [modalTitle, setModalTitle] = useState('New FAQ');

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page }));
  }, [page]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  // Handle Edit FAQ
  const handleEditFaq = (faq) => {
    setEditData(faq);
    setModalTitle('Edit FAQ');
    setOpenAddModal(true);
  };

  // Handle Modal Open/Close
  const handleOpenModal = (title, faq) => {
    setModalTitle(title);
    setEditData(faq);
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setEditData(null);
    setModalTitle('New FAQ');
  };

  // Handle Delete
  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteFaq(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'FAQ deleted successfully',
        color: 'green',
      });
      handleCloseModalDelete();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    faqData,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    
    // FAQ Modal
    modalTitle,
    openAddModal,
    handleOpenModal,
    handleCloseModal,
    editData,
    
    // Delete Modal
    openDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditFaq,
  };
}