'use client';
import { useState, useEffect } from 'react';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useDeleteMultipleCategoriesMutation,
  useUpdateCategoryMutation,
  useAddCategoryMutation
} from '@/services/blog/categories';
import { PAGE_SIZE } from '@/constants/pagination';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import { generateSlug } from '@/utils';
import { useForm } from '@mantine/form';

export default function useCategories() {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const initParams = {
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
    search: ''
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const { data: categoriesData, isLoading, isFetching } = useGetCategoriesQuery(filterParams);
  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);

  // handle change sortOrder
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  // Add/Edit Category
  const categoriesList = categoriesData?.data?.data?.map((category) => ({
    value: category._id,
    label: category.name,
  })) || [];
  const [catgData, setCatgData] = useState(null);
  const [openModalAddCatg, setOpenModalAddCatg] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Category');
  const [addCategory, { isLoading: loadingAddCatg }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: loadingUpdateCatg }] = useUpdateCategoryMutation();

  const formAddCatg = useForm({
    initialValues: {
      name: '',
      slug: '',
      parentCategory: null,
      description: '',
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
    },
  });

  useEffect(() => {
    if (catgData) {
      formAddCatg.setValues({
        name: catgData.name || '',
        slug: catgData.slug || '',
        parentCategory: catgData.parentCategory?._id || null,
        description: catgData.description || '',
      });
    }
  }, [catgData]);

  const handleOpenModalAddCatg = (title, data) => {
    setModalTitle(title);
    setCatgData(data);
    setOpenModalAddCatg(true);
  }
  const handleCloseModalAddCatg = () => {
    setOpenModalAddCatg(false);
    formAddCatg.reset();
  }

  const handleSubmitAddCatg = async (values) => {
    const slugValue = values?.slug === '' ? generateSlug(values?.name) : generateSlug(values?.slug);
    const payload = {
      name: values?.name,
      slug: slugValue,
      parentCategory: values?.parentCategory,
      description: values?.description,
    };
    if (modalTitle === 'Edit Category') {
      try {
        await updateCategory({
          id: catgData?._id,
          body: payload
        }).unwrap();
        handleCloseModalAddCatg();
        successSnackbar('Category updated successfully.');
      } catch (error) {
        errorSnackbar(error?.data?.message);
      }
    } else {
      try {
        await addCategory(payload).unwrap();
        successSnackbar('Category added successfully.');
        handleCloseModalAddCatg();
      } catch (error) {
        errorSnackbar(error?.data?.message);
      }
    }
  };

  // Delete bulk
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);
  const [deleteMultipleCategories, { isLoading: loadingBulkDelete }] = useDeleteMultipleCategoriesMutation();
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

  const handleBulkDeleteCategories = async () => {
    try {
      await deleteMultipleCategories(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Categories deleted successfully.');
    } catch (error) {
      console.error('Error deleting comments:', error);
      errorSnackbar(error.data.message);
    }
  };

  // Delete Single
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  }
  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenModalDelete(false);
  }
  const handleSubmitDelete = async () => {
    try {
      await deleteCategory(selectedId).unwrap();
      successSnackbar('Category deleted successfully.');
      handleCloseModalDelete();
    } catch (error) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    categoriesData,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    handleChangeFilter,

    // Delete Single
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleSubmitDelete,

    // Delete Bulk
    loadingBulkDelete,
    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteCategories,

    // Add/Edit Category
    categoriesList,
    modalTitle,
    openModalAddCatg,
    handleOpenModalAddCatg,
    handleCloseModalAddCatg,
    formAddCatg,
    loadingAddModal: loadingAddCatg || loadingUpdateCatg,
    handleSubmitAddCatg,
  };
}