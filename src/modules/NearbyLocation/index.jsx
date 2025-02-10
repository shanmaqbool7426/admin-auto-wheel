'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './NearbyLocation.module.css';
import useNearbyLocation from './useNearbyLocation';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddNearbyLocation from './AddNearbyLocation';

export default function NearbyLocationModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    locationsData,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    modalTitle,
    openModalLocation,
    handleOpenModal,
    handleCloseModal,
    selectedLocation,
    formLocation,
    loadingModal,
    handleSubmit,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditLocation
  } = useNearbyLocation();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditLocation 
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
            onClick={() => handleOpenModal('New Location', null)}
          >
            Add New Location
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={locationsData?.data || []}
          fetching={isLoading || isFetching}
          totalRecords={locationsData?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <AddNearbyLocation
        title={modalTitle}
        open={openModalLocation}
        onClose={handleCloseModal}
        selectedLocation={selectedLocation}
        form={formLocation}
        handleSubmit={handleSubmit}
        isLoading={loadingModal}
      />

      <ConfirmationModal
        title="Delete Location"
        message="Are you sure you want to delete this location?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}