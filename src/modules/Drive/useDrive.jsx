'use client';
import { useState } from 'react';
import { useGetDrivesQuery, useDeleteDriveMutation } from '@/services/drive';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';

export default function useDrive() {
  const [filterParams, setFilterParams] = useState({
    type: 'all',
    page: 1,
    limit: PAGE_SIZE,
    search: '',
    sortOrder: 'desc'
  });
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalDrive, setOpenModalDrive] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: drivesData, isLoading, isFetching } = useGetDrivesQuery(filterParams);

  const [deleteDrive, { isLoading: loadingDelete }] = useDeleteDriveMutation();

  const handleOpenModal = (title, drive) => {
    setModalTitle(title);
    setSelectedDrive(drive);
    setOpenModalDrive(true);
  };

  const handleCloseModal = () => {
    setOpenModalDrive(false);
    setSelectedDrive(null);
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
      await deleteDrive(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Drive deleted successfully',
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

  const handleEditDrive = (drive) => {
    handleOpenModal('Edit Drive', drive);
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
    drivesData,
    
    // Drive Modal
    modalTitle,
    openModalDrive,
    handleOpenModal,
    handleCloseModal,
    selectedDrive,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditDrive,
  };
}
