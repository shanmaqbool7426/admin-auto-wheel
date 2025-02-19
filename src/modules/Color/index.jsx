'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Color.module.css';
import useColor from './useColor';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddColor from './AddColor';
import FormField from '@/components/FormField';

export default function ColorModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    colorsData,
    setSearchBy,
    
    // Color Modal
    modalTitle,
    openModalColor,
    handleOpenModal,
    handleCloseModal,
    selectedColor,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditColor,
    filterParams,
    handleChangeFilter,
  } = useColor();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditColor 
  });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="type"
              data={[
                { value: 'all', label: 'All' },
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              placeholder="Vehicle Type"
              checkIconPosition="right"
              value={filterParams.type}
              onChange={(_value, option) => handleChangeFilter('type', option.value)}
            />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New Color', null)}
          >
            Add New Color
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={colorsData?.data?.colors || []}
          fetching={isLoading || isFetching}
          totalRecords={colorsData?.data?.pagination?.totalItems || 0}
          page={page}
          enablePagination
          onPageChange={setPage}
        />
      </Box>

      <AddColor
        title={modalTitle}
        open={openModalColor}
        onClose={handleCloseModal}
        selectedColor={selectedColor}
      />

      <ConfirmationModal
        title="Delete Color"
        message="Are you sure you want to delete this color?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}
