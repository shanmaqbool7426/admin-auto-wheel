'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Transmission.module.css';
import useTransmission from './useTransmission';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddTransmission from './AddTransmission';

export default function TransmissionModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    transmissionsData,
    setSearchBy,
    
    // Transmission Modal
    modalTitle,
    openModalTransmission,
    handleOpenModal,
    handleCloseModal,
    selectedTransmission,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditTransmission
  } = useTransmission();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditTransmission 
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
            onClick={() => handleOpenModal('New Transmission', null)}
          >
            Add New Transmission
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={transmissionsData?.data?.transmissions || []}
          fetching={isLoading || isFetching}
          totalRecords={transmissionsData?.data?.pagination?.totalItems || 0}
          page={page}
          enablePagination
          onPageChange={setPage}
        />
      </Box>

      <AddTransmission
        title={modalTitle}
        open={openModalTransmission}
        onClose={handleCloseModal}
        selectedTransmission={selectedTransmission}
      />

      <ConfirmationModal
        title="Delete Transmission"
        message="Are you sure you want to delete this transmission?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}
