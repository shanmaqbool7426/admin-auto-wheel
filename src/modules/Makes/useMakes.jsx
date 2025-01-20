'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  useGetMakesQuery,
  useDeleteBulkMakeMutation,
  useDeleteMakeMutation,
  useDeleteModelMutation
} from '@/services/make';
import { PAGE_SIZE } from '@/constants/pagination';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useMakes() {
  // API related state
  const [isMakeModalOpen, setIsMakeModalOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const initParams = {
    page,
    limit: PAGE_SIZE,
  };
  const [filterParams, setFilterParams] = useState(initParams);

  // UI state
  const [expandedMakeIds, setExpandedMakeIds] = useState([]);
  const [expandedModelIds, setExpandedModelIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);

  // API queries
  const {
    data: makesData,
    isLoading: loadingGetMake,
    isFetching: fetchingGetMake,
    isError
  } = useGetMakesQuery(filterParams);

  const [deleteBulkMake, { isLoading: loadingBulkDelete }] = useDeleteBulkMakeMutation();
  const [deleteMake, { isLoading: loadingDeleteMake }] = useDeleteMakeMutation();
  const [deleteModel, { isLoading: loadingDeleteModel }] = useDeleteModelMutation();
  // delete mmodel
  
  const transformedMakesData = useMemo(() => {
    if (!makesData?.data) return { data: [] };
    
    let filteredData = [...makesData.data];

    // Apply type filter
    if (selectedType) {
        filteredData = filteredData.filter(item => item.type === selectedType);
    }

    // Apply search filter if exists
    if (searchQuery) {
      filteredData = filteredData.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }

    // Apply sorting
    filteredData.sort((a, b) => {
        const typeOrder = {
            'car': 1,
            'bike': 2,
            'truck': 3
        };
        return (typeOrder[a.type] || 999) - (typeOrder[b.type] || 999);
    });

    return {
        ...makesData,
        data: filteredData.map(make => ({
            ...make,
            id: make._id,
            models: make.models?.map(model => ({
                ...model,
                id: model._id,
                variants: model.variants
            }))
        }))
    };
  }, [makesData, selectedType, searchQuery]);

  // Constants
  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'car', label: 'Cars' },
    { value: 'bike', label: 'Bikes' },
    { value: 'truck', label: 'Trucks' },
  ];

  // Effects
  useEffect(() => {
    if (fetchingGetMake) {
      setSelectedRecords([]);
    }
  }, [fetchingGetMake]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);

  // Memoized data
  const filteredData = useMemo(() => {
    return makesData?.data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || item.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [makesData?.data, searchQuery, selectedType]);

  // Handlers
  const getTypeIcon = (type) => {
    switch (type) {
      case 'car':
        return 'car';
      case 'bike':
        return 'bike';
      case 'truck':
        return 'truck';
      default:
        return 'car';
    }
  };

  const handleDelete = (id, type) => {
    console.log(`Delete ${type} with id:`, id);
    // Implement delete logic
    deleteMake(id)

  };

  const handleEdit = (item, type) => {
    console.log(`Edit>>>>>>>>>> ${type}:`, item);
    // Implement edit logic
    setIsMakeModalOpen(true)
  };

  const handleEditForModel = (item, type) => {
    console.log(`Edit>>>>>>>>>> ${type}:`, item);
    // Implement edit logic
    setIsModelModalOpen(true)
  };
  // edit for varient
  const handleEditForVariant = (item, type) => {
    console.log(`Edit>>>>>>>>>> ${type}:`, item);
    // Implement edit logic
    setIsVariantModalOpen(true)
  };
  // delete the model
  const handleDeleteModel = (id, makeId) => {
    console.log(`Delete model with id:`, id);
    deleteModel({makeId,id})
  };


  const handleModelClick = (model) => {
    console.log('Selected model:', model);
    // Implement model click logic
  };

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

  const handleBulkDeleteMakes = async () => {
    try {
      await deleteBulkMake(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Makes deleted successfully.');
    } catch (error) {
      console.error('Error deleting makes:', error);
      errorSnackbar(error.data.message);
    }
  };

  return {
    // Data
    makesData,
    transformedMakesData,
    filteredData,
    typeOptions,
    
    // Loading states
    loadingGetMake,
    fetchingGetMake,
    loadingBulkDelete,
    
    // State variables
    page,
    searchQuery,
    selectedType,
    selectedRecords,
    expandedMakeIds,
    expandedModelIds,
    isMakeModalOpen,
    isModelModalOpen,
    isVariantModalOpen,
    openBulkDeleteModal,
    
    // State setters
    setPage,
    setSearchQuery,
    setSelectedType,
    setSelectedRecords,
    setExpandedMakeIds,
    setExpandedModelIds,
    setIsMakeModalOpen,
    setIsModelModalOpen,
    setIsVariantModalOpen,
    setSearchBy,
    
    // Handlers
    getTypeIcon,
    handleDelete,
    
    handleEdit,
    handleEditForModel,
    handleEditForVariant,
    handleModelClick,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteMakes,
    handleDeleteModel

  };
}