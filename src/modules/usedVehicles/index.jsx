'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import useUsedVehicles  from './useUsedVehicles';
import { getColumns } from './UsedVehicles.data';
import styles from './UsedVehicles.module.css';
import { useRouter } from 'next/navigation';

export default function UsedVehicles() {
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

  } = useUsedVehicles();

  const router = useRouter();

  const columns = getColumns(handleClickEditRow, handleClickDeleteRow, handleClickDuplicate, router);
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
           
          </Box>
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={data || []}
          fetching={isLoading || isFetching}
          selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={data?.data?.totalVehicles || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>
    </>
  );
}