'use client';
import { useState } from 'react';
import { useGetDrivesQuery, useDeleteDriveMutation } from '@/services/drive';
import { notifications } from '@mantine/notifications';

export default function useDrive() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalDrive, setOpenModalDrive] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: drivesData, isLoading, isFetching } = useGetDrivesQuery({
    page,
    search: searchBy,
  });

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

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    drivesData,
    setSearchBy,
    
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
