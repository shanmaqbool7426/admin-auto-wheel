'use client';
import { useState } from 'react';
import { useGetColorsQuery, useDeleteColorMutation } from '@/services/color';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';

export default function useColor() {
  const [filterParams, setFilterParams] = useState({
    type: 'all',
    page: 1,
    limit: PAGE_SIZE,
    search: '',
    sortOrder: 'desc'
  });
  const [selectedColor, setSelectedColor] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalColor, setOpenModalColor] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: colorsData, isLoading, isFetching } = useGetColorsQuery(filterParams);

  const [deleteColor, { isLoading: loadingDelete }] = useDeleteColorMutation();

  const handleOpenModal = (title, color) => {
    setModalTitle(title);
    setSelectedColor(color);
    setOpenModalColor(true);
  };

  const handleCloseModal = () => {
    setOpenModalColor(false);
    setSelectedColor(null);
  };

  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    try {
      await deleteColor(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Color deleted successfully',
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

  const handleEditColor = (color) => {
    handleOpenModal('Edit Color', color);
  };

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const setSearchBy = (value) => {
    handleChangeFilter('search', value);
  };

  const setPage = (value) => {
    handleChangeFilter('page', value);
  };

  return {
    page: filterParams.page,
    setPage,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    isLoading,
    isFetching,
    colorsData,
    
    // Color Modal
    modalTitle,
    openModalColor,
    handleOpenModal,
    handleCloseModal,
    selectedColor,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditColor,
  };
}
