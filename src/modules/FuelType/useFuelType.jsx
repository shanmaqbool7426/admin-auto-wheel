'use client';
import { useState } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import { useGetFuelTypesQuery, useDeleteFuelTypeMutation } from '@/services/fuel-type';
import { notifications } from '@mantine/notifications';

export default function useFuelType() {
  const [filterParams, setFilterParams] = useState({
    type: 'all',
    page: 1,
    limit: PAGE_SIZE,
    search: '',
    sortOrder: 'desc'
  });
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [openModalFuelType, setOpenModalFuelType] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: fuelTypesData, isLoading, isFetching } = useGetFuelTypesQuery(filterParams);
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
    fuelTypesData,
    
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
