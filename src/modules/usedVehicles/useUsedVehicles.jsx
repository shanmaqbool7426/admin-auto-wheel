// Used Vehicles
'use client';
import { useState, useEffect } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetUsedVehiclesQuery,
  useDeleteBulkUsedVehiclesMutation,
  useUpdateVehicleStatusMutation,
} from '@/services/used-vehicles';
import { useParams, useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';


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
    status: '',
    limit: PAGE_SIZE,
    search: '',
  }
  const [filterParams, setFilterParams] = useState(initParams);
  
  const { data, isLoading, isFetching, isError } = useGetUsedVehiclesQuery(filterParams);

console.log("selectedRecords", selectedRecords);
  // Search query parameters // FOR PAGE increament

  useEffect(() => {
    
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(()=>{
    setFilterParams(prev => ({ ...prev, page: page }));
  },[page])

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, type: activeTab }));
  }, [activeTab]);

  // handle change filters
  const handleChangeFilter = (name, value) => {


    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

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
if(selectedRecords.length > 0){
  await deleteBulkVehicles(selectedRecords.map(item => item?._id)).unwrap();
}else{
  await deleteBulkVehicles([vehicleId]).unwrap();
      }
      handleCloseDeleteModal();
      // mantine notification
      notifications.show({
        title: 'Vehicle deleted successfully',
        message: 'Vehicle deleted successfully',
        color: 'green',
      });
      // successSnackbar('Vehicle deleted successfully');
    } catch (error) {
      console.error('Error deleting vehicles:', error);
      notifications.show({
        title: 'Error deleting vehicles',
        message: error.data.message,
        color: 'red',
      });
    }
  };

  const [updateVehicleStatus, { isLoading: loadingStatusChange }] = useUpdateVehicleStatusMutation();
  const handleStatusChange = async (id, status) => {
    try {
      await updateVehicleStatus({ id, status }).unwrap();
      notifications.show({
        title: 'Vehicle status updated successfully',
        message: 'Vehicle status updated successfully',
        color: 'green',
      }); 
    } catch (error) {
      console.error('Failed to update status:', error);
      notifications.show({
        title: 'Failed to update status',
        message: error.data.message,
        color: 'red',
      });
    }
  };

  // handle bulk actions
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);
  
  const handleOpenBulkDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseBulkDeleteModal = () => {
    setOpenDeleteModal(false);
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
      notifications.show({
        title: 'Vehicles deleted successfully',
        message: 'Vehicles deleted successfully',
        color: 'green',
      });
    } catch (error) {
      console.error('Error deleting vehicles:', error);
      notifications.show({
        title: 'Error deleting vehicles',
        message: error.data.message,
        color: 'red',
      });
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
      notifications.show({
        title: 'Vehicle duplicated successfully',
        message: 'Vehicle duplicated successfully',
        color: 'green',
      });
    } catch (error) {
      console.error('Error duplicating vehicle:', error);
      notifications.show({
        title: 'Error duplicating vehicle',
        message: error.data?.message || 'Failed to duplicate vehicle',
        color: 'red',
      });
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
    handleStatusChange,
  };
} 