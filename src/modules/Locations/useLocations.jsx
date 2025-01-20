'use client';
import { useState, useEffect } from 'react';
import {
  useGetLocationsQuery,
  useAddLocationMutation,
  useDeleteBulkLocationMutation,
} from '@/services/location';
import { PAGE_SIZE } from '@/constants/pagination';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useLocations() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const initParams = {
    page,
    limit: PAGE_SIZE,
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const {
    data: locationsData,
    isLoading: loadingGetLocation,
    isFetching: fetchingGetLocation,
    isError
  } = useGetLocationsQuery(filterParams);

  useEffect(() => {
    if (fetchingGetLocation) {
      setSelectedRecords([]);
    }
  }, [fetchingGetLocation]);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);


  // handle delete bulk locations
  const [deleteBulkLocation, { isLoading: loadingBulkDelete }] = useDeleteBulkLocationMutation();
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

  const handleBulkDeleteLocations = async () => {
    try {
      await deleteBulkLocation(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Locations deleted successfully.');
    } catch (error) {
      console.error('Error deleting location:', error);
      errorSnackbar(error.data.message);
    }
  };


  return {
    page,
    setPage,

    selectedRecords,
    setSelectedRecords,

    locationsData,
    loadingGetLocation,
    fetchingGetLocation,

    setSearchBy,
    filterParams,

    setIsLocationModalOpen,
    isLocationModalOpen,

    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteLocations,
    loadingBulkDelete,
  };
}
