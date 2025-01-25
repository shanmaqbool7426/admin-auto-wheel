'use client';
import { use, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetBodiesQuery,
  useAddBodyMutation,
  useUpdateBodyMutation,
  useDeleteBodyMutation,
} from '@/services/bodies';
import { useGetBannersQuery } from '@/services/banner';



export default function useBodies() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [type, setType] = useState('all');

  const [filterParams, setFilterParams] = useState({
    page,
    limit: PAGE_SIZE,
    search: searchBy,
    type: type
  });


useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      page,
      search: searchBy,
      type: type
    }));
 }, [searchBy, type]);
  console.log("searchBy",searchBy)

  const { data: bannersData, isLoading: isLoadingBanners, isFetching: isFetchingBanners } = useGetBannersQuery(filterParams);
  const { data: bodiesData, isLoading, isFetching } = useGetBodiesQuery(filterParams);
  const [addBody, { isLoading: loadingAdd }] = useAddBodyMutation();
  const [updateBody, { isLoading: loadingUpdate }] = useUpdateBodyMutation();
  const [deleteBody, { isLoading: loadingDelete }] = useDeleteBodyMutation();

  const [openModalBody, setOpenModalBody] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Body Type');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
console.log(">>>>>>>>bodiesData", bodiesData?.data);

  const formBody = useForm({
    initialValues: {
      name: '',
      type: '',
      bodyImage: null,
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
      type: (value) => (!value ? 'Type is required' : null),
      bodyImage: (value) => (!value ? 'Image is required' : null),
    },
  });

  // Modal handlers
  const handleOpenModal = (title, body = null) => {
    setModalTitle(title);
    setSelectedBody(body);
    if (body) {
      formBody.setValues({
        name: body.name,
        type: body.type,
        bodyImage: body.bodyImage,
      });
    } else {
      formBody.reset();
    }
    setOpenModalBody(true);
  };

  const handleCloseModal = () => {
    setOpenModalBody(false);
    setSelectedBody(null);
    formBody.reset();
  };

  // Delete modal handlers
  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenModalDelete(false);
  };

  // Submit handlers
  const handleSubmit = async (values) => {
    try {
      if (selectedBody) {
        await updateBody({ id: selectedBody._id, ...values }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Body type updated successfully',
          color: 'green',
        });
      } else {
        await addBody(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Body type added successfully',
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

  const handleDelete = async () => {
    try {
      await deleteBody(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Body type deleted successfully',
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

  // Edit handler
  const handleEditBody = (body) => {
    handleOpenModal('Edit Body Type', body);
  };

  console.log(">>>>>>>>bannersData", bannersData?.data);

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    bodiesData: bodiesData?.data,
    setSearchBy,
    filterParams,
    modalTitle,
    openModalBody,
    handleOpenModal,
    handleCloseModal,
    selectedBody,
    formBody,
    loadingModal: loadingAdd || loadingUpdate,
    handleSubmit,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditBody,
    setType
  };
} 