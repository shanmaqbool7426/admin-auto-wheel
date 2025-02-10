'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetNearbyLocationsQuery,
  useAddNearbyLocationMutation,
  useUpdateNearbyLocationMutation,
  useDeleteNearbyLocationMutation,
} from '@/services/near-by-location';

export default function useNearbyLocation() {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    sortBy: 'order',
    sortOrder: 'asc',
    page,
    limit: PAGE_SIZE,
  });

  const { data: locationsData, isLoading, isFetching } = useGetNearbyLocationsQuery(filterParams);
  const [addLocation, { isLoading: loadingAdd }] = useAddNearbyLocationMutation();
  const [updateLocation, { isLoading: loadingUpdate }] = useUpdateNearbyLocationMutation();
  const [deleteLocation, { isLoading: loadingDelete }] = useDeleteNearbyLocationMutation();

  // Form handling
  const [locationData, setLocationData] = useState(null);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Location');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const formLocation = useForm({
    initialValues: {
      title: '',
      description: '',
      image: null,
      slug: '',
      order: 0,
      status: true,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      image: (value) => (!value && !locationData?.image ? 'Image is required' : null),
      slug: (value) => {
        if (!value) return 'Slug is required';
        if (!/^[a-z0-9-]+$/.test(value)) return 'Slug can only contain lowercase letters, numbers, and hyphens';
        return null;
      },
      order: (value) => {
        if (value < 0) return 'Order must be a positive number';
        if (!Number.isInteger(Number(value))) return 'Order must be a whole number';
        return null;
      },
    },
  });

  useEffect(() => {
    if (locationData) {
      formLocation.setValues({
        title: locationData.title || '',
        description: locationData.description || '',
        image: null,
        slug: locationData.slug || '',
        order: locationData.order || 0,
        status: locationData.status ?? true,
      });
    }
  }, [locationData]);

  // Handle Edit Location
  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setModalTitle('Edit Location');
    setOpenModalLocation(true);
  };

  // Handle Modal Open/Close
  const handleOpenModal = (title, location) => {
    setModalTitle(title);
    setSelectedLocation(location);
    setOpenModalLocation(true);
  };

  const handleCloseModal = () => {
    setOpenModalLocation(false);
    setSelectedLocation(null);
    setModalTitle('New Location');
  };

  // Handle Delete
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
      await deleteLocation(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Location deleted successfully',
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

  // Form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] !== null) {
        if (key === 'image' && values[key] instanceof File) {
          formData.append(key, values[key]);
        } else if (key !== 'image') {
          formData.append(key, values[key]);
        }
      }
    });

    try {
      if (modalTitle === 'Edit Location') {
        await updateLocation({
          id: locationData._id,
          body: formData
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Location updated successfully',
          color: 'green',
        });
      } else {
        await addLocation(formData).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Location added successfully',
          color: 'green',
        });
      }
      handleCloseModal();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    locationsData,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    
    // Location Modal
    modalTitle,
    openModalLocation,
    handleOpenModal,
    handleCloseModal,
    selectedLocation,
    formLocation,
    loadingModal: loadingAdd || loadingUpdate,
    handleSubmit,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditLocation,
  };
}