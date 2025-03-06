'use client';
import { useState, useEffect } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetNewVehiclesQuery,
  useDeleteBulkNewVehiclesMutation,
} from '@/services/newVehicles';
import { useParams, useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';



export default function useNewVehicles() {
  const router = useRouter();
  const { activeTab } = useParams();
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initParams = {
    type: 'all',
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
    search: '',
  }
  const [filterParams, setFilterParams] = useState(initParams);
  
  const { data, isLoading, isFetching, isError } = useGetNewVehiclesQuery(filterParams);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, type: activeTab }));
  }, [activeTab]);

  // Update error handling for data fetching
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch vehicles data',
        color: 'red',
        icon: <IconX />,
      });
    }
  }, [isError]);

  // handle change filters
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  console.log(">>>>>data>>", filterParams);
  // handle delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vehicleId, setVehicleId] = useState();
  const [deleteBulkVehicles, { isLoading: loadingBulkDelete }] = useDeleteBulkNewVehiclesMutation();

  const handleOpenDeleteModal = (id) => {
    setVehicleId(id)
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Update handleDeleteVehicle with notifications
  const handleDeleteVehicle = async () => {
    setIsSubmitting(true);
    try {
      await deleteBulkVehicles([vehicleId]).unwrap();
      handleCloseDeleteModal();
      notifications.show({
        title: 'Success',
        message: 'Vehicle deleted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.data?.message || 'Error deleting vehicle',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle bulk actions
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

  // Update handleBulkDeleteVehicles with notifications
  const handleBulkDeleteVehicles = async () => {
    setIsSubmitting(true);
    try {
      await deleteBulkVehicles(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      notifications.show({
        title: 'Success',
        message: 'Vehicles deleted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.data?.message || 'Error deleting vehicles',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

//   const { successSnackbar, errorSnackbar } = useSnackbar();
//   const [createNewVehicle] = useCreateNewVehicleMutation();

  // Handle Edit Row
  const handleClickEditRow = (record) => {
    router.push(`/vehicles/edit/${record._id}`);
  };

  // Handle Delete Row
  const handleClickDeleteRow = (record) => {
    setVehicleId(record._id);
    setOpenDeleteModal(true);
  };

  // Handle Duplicate Row
  const handleClickDuplicate = async (record) => {
    try {
      // Create a new vehicle object without the _id
      const vehicleData = {
        ...record,
        _id: undefined,
        name: `${record.name} (Copy)`,
      };

      // Call your API to create a new vehicle
    //   const response = await createNewVehicle(vehicleData).unwrap();
    //   successSnackbar('Vehicle duplicated successfully');
    } catch (error) {
      console.error('Error duplicating vehicle:', error);
    //   errorSnackbar(error.data?.message || 'Failed to duplicate vehicle');
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
    handleDeleteVehicle,
    openBulkDeleteModal,
    handleOpenBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteVehicles,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickDuplicate,
    error,
    isSubmitting,
  };
}