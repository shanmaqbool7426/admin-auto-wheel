'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Drive.module.css';
import useDrive from './useDrive';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddDrive from './AddDrive';

export default function DriveModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    drivesData,
    setSearchBy,
    
    // Drive Modal
    modalTitle,
    openModalDrive,
    handleOpenModal,
    handleCloseModal,
    selectedDrive,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditDrive
  } = useDrive();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditDrive 
  });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New Drive', null)}
          >
            Add New Drive
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={drivesData?.data || []}
          fetching={isLoading || isFetching}
          totalRecords={drivesData?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <AddDrive
        title={modalTitle}
        open={openModalDrive}
        onClose={handleCloseModal}
        selectedDrive={selectedDrive}
      />

      <ConfirmationModal
        title="Delete Drive"
        message="Are you sure you want to delete this drive?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}
