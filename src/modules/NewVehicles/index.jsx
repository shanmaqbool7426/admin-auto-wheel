'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useNewVehicles  from './useNewVehicles';
import { getColumns } from './NewVehicles.data';
import { IconPlus } from '@/assets/icons';
import styles from './NewVehicles.module.css';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function NewVehicles() {
  const {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    isError,
    isLoading,
    isFetching,
    data,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    loadingBulkDelete,
    handleDeleteVehicle,
    openBulkDeleteModal,
    handleOpenBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteVehicles,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickDuplicate,

  } = useNewVehicles();

  const router = useRouter();

  const columns = getColumns(handleClickEditRow, handleOpenDeleteModal, handleClickDuplicate, router);
  const [bulkActionValue, setBulkActionValue] = React.useState('');

  console.log(">>>>>data", data);
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
              disabled={selectedRecords.length === 0}
              name="actions"
              data={[
                { value: 'delete', label: 'Delete' },
                { value: 'duplicate', label: 'Duplicate' },
              ]}
              placeholder="Bulk Action"
              checkIconPosition="right"
              onChange={(_value, option) => {
                handleBulkAction(option?.value)
              }}
            />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="type"
              data={[
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
          <Box className={styles.rightDropdown}>
            <FormField
              type="select"
              name="date"
              data={[
                { value: 'newToOld', label: 'Date, new to old' },
                { value: 'oldToNew', label: 'Date, old to new' },
              ]}
              placeholder="Date, new to old"
              checkIconPosition="right"
              value={filterParams.date}
              onChange={(_value, option) => handleChangeFilter('date', option.value)}
            />
          </Box>
          <Box>
            <CustomButton
              leftSection={<IconPlus />}
              onClick={()=>router.push('/vehicle-add')}
            >
              Add Vehicle
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={data?.data?.vehicles || []}
          fetching={isLoading || isFetching}
          selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={data?.data?.total || 0}
          page={page}
          enablePagination
          onPageChange={setPage}
        />
      </Box>

      <ConfirmationModal
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle?"
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteVehicle}
        // isLoading={loadingDelete}
      />
    </>
  );
}