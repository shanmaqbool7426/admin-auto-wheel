import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import {
  useGetFooterLinksQuery,
  useAddFooterLinkMutation,
  useUpdateFooterLinkMutation,
  useDeleteFooterLinkMutation,
} from '@/services/footer';

export default function useFooterLinks() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: response, isLoading: loading } = useGetFooterLinksQuery({
    page,
    limit,
    search,
  });
  const [deleteFooterLink, { isLoading: loadingDelete }] = useDeleteFooterLinkMutation();

  const footerLinks = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / limit);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleAddClick = () => {
    setSelectedData(null);
    setShowAddModal(true);
  };

  const handleEditClick = (data) => {
    setSelectedData(data);
    setShowAddModal(true);
  };

  const handleDeleteClick = (data) => {

    console.log("data",data)
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedData(null);
  };

  const handleCloseModalDelete = () => {
    setShowDeleteModal(false);
    setSelectedData(null);
  };

  const handleDelete = async () => {
    console.log("del")
    try {
      await deleteFooterLink(selectedData?._id).unwrap();
      showNotification({
        title: 'Success',
        message: 'Footer link deleted successfully',
        color: 'green',
      });
      handleCloseModalDelete();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    page,
    limit,
    search,
    loading,
    loadingDelete,
    footerLinks,
    totalPages,
    showAddModal,
    selectedData,
    showDeleteModal,
    handleSearch,
    handlePageChange,
    handleLimitChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleModalClose,
    handleCloseModalDelete,
    handleDelete,
  };
}
