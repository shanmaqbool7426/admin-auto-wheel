'use client';
import React from 'react';
import { Box } from '@mantine/core';
import { IconPlus } from '@/assets/icons';
import CustomButton from '@/components/CustomButton';
import DataTable from '@/components/DataTable';
import AddFooterLink from './AddFooterLink';
import { getColumns } from './data';
import useFooterLinks from './useFooterLinks';
import styles from './Links.module.css';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function FooterLinks() {
  const {
    footerLinks,
    loading,
    loadingDelete,
    showAddModal,
    showDeleteModal,
    selectedData,
    handleAddClick,
    handleModalClose,
    handleEditClick,
    handleDeleteClick,
    handleCloseModalDelete,
    handleDelete,
  } = useFooterLinks();

  const columns = getColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  console.log("selectedData",selectedData)

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <h2>Footer Links</h2>
        <CustomButton
          leftIcon={<IconPlus />}
          onClick={handleAddClick}
        >
          Add Footer Link
        </CustomButton>
      </Box>

      <DataTable
        columns={columns}
        records={footerLinks || []}
        fetching={loading}
      />

      {showAddModal && (
        <AddFooterLink
          selectedData={selectedData}
          onClose={handleModalClose}
          // footerLink={footerLink}
        />
      )}

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Footer Link"
        message={`Are you sure you want to delete "${selectedData?.title}"? This action cannot be undone.`}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        loading={loadingDelete}
      />
    </Box>
  );
}
