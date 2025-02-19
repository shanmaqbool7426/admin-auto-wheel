'use client';
import { useState } from 'react';
import { useGetFuelTypesQuery, useDeleteFuelTypeMutation } from '@/services/fuel-type';
import { notifications } from '@mantine/notifications';

export default function useFuelType() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalFuelType, setOpenModalFuelType] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: fuelTypesData, isLoading, isFetching } = useGetFuelTypesQuery({
    page,
    search: searchBy,
  });

  const [deleteFuelType, { isLoading: loadingDelete }] = useDeleteFuelTypeMutation();

  const handleOpenModal = (title, fuelType) => {
    setModalTitle(title);
    setSelectedFuelType(fuelType);
    setOpenModalFuelType(true);
  };

  const handleCloseModal = () => {
    setOpenModalFuelType(false);
    setSelectedFuelType(null);
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
      await deleteFuelType(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Fuel Type deleted successfully',
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

  const handleEditFuelType = (fuelType) => {
    handleOpenModal('Edit Fuel Type', fuelType);
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    fuelTypesData,
    setSearchBy,
    
    // FuelType Modal
    modalTitle,
    openModalFuelType,
    handleOpenModal,
    handleCloseModal,
    selectedFuelType,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditFuelType,
  };
}
