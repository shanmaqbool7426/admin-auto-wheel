// Used Vehicles
'use client';
import { useState, useEffect } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetUsedVehiclesQuery,
  useDeleteBulkUsedVehiclesMutation,
} from '@/services/used-vehicles';
import { useParams, useRouter } from 'next/navigation';



export default function useUsedVehicles() {
  const router = useRouter();
  const { activeTab } = useParams();
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  
  const initParams = {
    type: 'all',
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
    search: '',
  }
  const [filterParams, setFilterParams] = useState(initParams);
  
  const { data, isLoading, isFetching, isError } = useGetUsedVehiclesQuery(filterParams);

  console.log(">>>>>data......", data?.data);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, type: activeTab }));
  }, [activeTab]);

  // handle change filters
  const handleChangeFilter = (name, value) => {


    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  console.log(">>>>>data>>", filterParams);
  // handle delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vehicleId, setVehicleId] = useState();
  const [deleteBulkVehicles, { isLoading: loadingBulkDelete }] = useDeleteBulkUsedVehiclesMutation();

  const handleOpenDeleteModal = (id) => {
    setVehicleId(id)
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteVehicle = async () => {
    try {
      await deleteBulkVehicles([vehicleId]).unwrap();
      handleCloseDeleteModal();
      successSnackbar('Vehicle deleted successfully');
    } catch (error) {
      console.error('Error deleting vehicles:', error);
      errorSnackbar(error.data.message);
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

  const handleBulkDeleteVehicles = async () => {
    try {
      await deleteBulkVehicles(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Vehicles deleted successfully.');
    } catch (error) {
      console.error('Error deleting vehicles:', error);
      errorSnackbar(error.data.message);
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
      const response = await createNewVehicle(vehicleData).unwrap();
      successSnackbar('Vehicle duplicated successfully');
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
    data: data?.data,
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
  };
} 