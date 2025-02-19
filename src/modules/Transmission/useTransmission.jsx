'use client';
import { useState } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import { useGetTransmissionsQuery, useDeleteTransmissionMutation } from '@/services/transmission';
import { notifications } from '@mantine/notifications';

export default function useTransmission() {
  const [filterParams, setFilterParams] = useState({
    type: 'all',
    page: 1,
    limit: PAGE_SIZE,
    search: '',
    sortOrder: 'desc'
  });
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalTransmission, setOpenModalTransmission] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: transmissionsData, isLoading, isFetching } = useGetTransmissionsQuery(filterParams);
  const [deleteTransmission, { isLoading: loadingDelete }] = useDeleteTransmissionMutation();

  const handleOpenModal = (title, transmission) => {
    setModalTitle(title);
    setSelectedTransmission(transmission);
    setOpenModalTransmission(true);
  };

  const handleCloseModal = () => {
    setOpenModalTransmission(false);
    setSelectedTransmission(null);
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
      await deleteTransmission(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Transmission deleted successfully',
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

  const handleEditTransmission = (transmission) => {
    handleOpenModal('Edit Transmission', transmission);
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
    transmissionsData,
    
    // Transmission Modal
    modalTitle,
    openModalTransmission,
    handleOpenModal,
    handleCloseModal,
    selectedTransmission,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditTransmission,
  };
}
