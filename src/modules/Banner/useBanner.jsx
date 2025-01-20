'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetBannersQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from '@/services/banner';

export default function useBanner() {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    sortBy: 'order',
    sortOrder: 'asc',
    page,
    limit: PAGE_SIZE,
  });

  const { data: bannersData, isLoading, isFetching } = useGetBannersQuery(filterParams);
  const [addBanner, { isLoading: loadingAdd }] = useAddBannerMutation();
  const [updateBanner, { isLoading: loadingUpdate }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: loadingDelete }] = useDeleteBannerMutation();

  // Form handling
  const [bannerData, setBannerData] = useState(null);
  const [openModalBanner, setOpenModalBanner] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Banner');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const formBanner = useForm({
    initialValues: {
      title: '',
      description: '',
      image: null,
      link: '',
      order: 0,
      status: true,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      image: (value) => (!value && !bannerData?.image ? 'Image is required' : null),
      order: (value) => {
        if (value < 0) return 'Order must be a positive number';
        if (!Number.isInteger(Number(value))) return 'Order must be a whole number';
        return null;
      },
    },
  });

  console.log(">>>>>>>>>>bannersData", bannersData);
  useEffect(() => {
    if (bannerData) {
      formBanner.setValues({
        title: bannerData.title || '',
        description: bannerData.description || '',
        image: null,
        link: bannerData.link || '',
        order: bannerData.order || 0,
        status: bannerData.status ?? true,
      });
    }
  }, [bannerData]);

  // Handle Edit Banner
  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setModalTitle('Edit Banner');
    setOpenModalBanner(true);
  };

  // Handle Modal Open/Close
  const handleOpenModal = (title, banner) => {
    setModalTitle(title);
    setSelectedBanner(banner);
    setOpenModalBanner(true);
  };

  const handleCloseModal = () => {
    setOpenModalBanner(false);
    setSelectedBanner(null);
    setModalTitle('New Banner');
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
      await deleteBanner(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Banner deleted successfully',
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
      if (modalTitle === 'Edit Banner') {
        await updateBanner({
          id: bannerData._id,
          body: formData
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Banner updated successfully',
          color: 'green',
        });
      } else {
        await addBanner(formData).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Banner added successfully',
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
    bannersData,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    
    // Banner Modal
    modalTitle,
    openModalBanner,
    handleOpenModal,
    handleCloseModal,
    selectedBanner,
    formBanner,
    loadingModal: loadingAdd || loadingUpdate,
    handleSubmit,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditBanner,
  };
}