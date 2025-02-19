'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './FuelType.module.css';
import useFuelType from './useFuelType';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddFuelType from './AddFuelType';
import FormField from '@/components/FormField';

export default function FuelTypeModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    fuelTypesData,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    
    // FuelType Modal
    modalTitle,
    openModalFuelType,
    handleOpenModal,
    handleCloseModal,
    selectedFuelType,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditFuelType
  } = useFuelType();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditFuelType 
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
            onClick={() => handleOpenModal('New Fuel Type', null)}
          >
            Add New Fuel Type
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={fuelTypesData?.data?.fuelTypes || []}
          fetching={isLoading || isFetching}
          totalRecords={fuelTypesData?.data?.pagination?.totalItems || 0}
          page={page}
          enablePagination
          onPageChange={setPage}
        />
      </Box>

      <AddFuelType
        title={modalTitle}
        open={openModalFuelType}
        onClose={handleCloseModal}
        selectedFuelType={selectedFuelType}
      />

      <ConfirmationModal
        title="Delete Fuel Type"
        message="Are you sure you want to delete this fuel type?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}
