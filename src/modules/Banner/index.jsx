'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Banner.module.css';
import useBanner from './useBanner';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddBanner from './AddBanner/index.jsx';  

export default function BannerModule() {
  const {
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
    loadingModal,
    handleSubmit,

    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditBanner
  } = useBanner();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditBanner 
  });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
                {/* <Box className={styles.searchbar}>
                    <Search setSearchBy={setSearchBy} />
                </Box> */}
        </Box>
        <Box className={styles.filterbarRight}>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New Banner', null)}
          >
            Add New Banner
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={bannersData?.data || []}
          fetching={isLoading || isFetching}
          totalRecords={bannersData?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <AddBanner
        title={modalTitle}
        open={openModalBanner}
        onClose={handleCloseModal}
        selectedBanner={selectedBanner}
        form={formBanner}
        handleSubmit={handleSubmit}
        isLoading={loadingModal}
      />

      <ConfirmationModal
        title="Delete Banner"
        message="Are you sure you want to delete this banner?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}