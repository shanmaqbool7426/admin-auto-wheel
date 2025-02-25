'use client';
import { useState, useEffect } from 'react';
import { useGetCompetitorsQuery, useDeleteCompetitorMutation } from '@/services/competitor';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useCompetitor() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    page,
    limit: 10,
    search: searchBy,
    type: 'all'
  });

  const [openModalCompetitor, setOpenModalCompetitor] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedCompetitorSet, setSelectedCompetitorSet] = useState(null);

  const { data: competitorsData, isLoading, isFetching } = useGetCompetitorsQuery(filterParams);
  const [deleteCompetitor, { isLoading: loadingDelete }] = useDeleteCompetitorMutation();

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page }));
  }, [page]);

  const handleChangeFilter = (key, value) => {
    setFilterParams(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleOpenModal = (title, data = null) => {
    setModalTitle(title);
    setSelectedCompetitorSet(data);
    setOpenModalCompetitor(true);
  };

  const handleCloseModal = () => {
    setOpenModalCompetitor(false);
    setSelectedCompetitorSet(null);
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
      await deleteCompetitor(selectedId).unwrap();
      successSnackbar('Competitor deleted successfully');
      handleCloseModalDelete();
    } catch (error) {
      errorSnackbar(error?.data?.message || 'Something went wrong');
    }
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    competitorsData,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    modalTitle,
    openModalCompetitor,
    handleOpenModal,
    handleCloseModal,
    selectedCompetitorSet,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleDelete
  };
} 