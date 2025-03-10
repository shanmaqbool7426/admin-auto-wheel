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
import ConfirmationModal from '@/components/ConfirmationModal';

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
    handleStatusChange
  } = useUsedVehicles();

  const router = useRouter();

  const columns = getColumns(handleClickEditRow, handleClickDeleteRow, router,handleStatusChange);
  const [bulkActionValue, setBulkActionValue] = React.useState('');

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
          {/* status */}
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="status"
              data={[{value:"", label:"All"} ,{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'deleted', label: 'Deleted' }, { value: 'featured', label: 'Featured' }, { value: 'sold', label: 'Sold' },{ value: 'pending', label: 'Pending' },{ value: 'approved', label: 'Approved' },{ value: 'rejected', label: 'Rejected'},{ value: 'expired', label: 'Expired' }]}
              placeholder="Status"
              checkIconPosition="right"
              value={filterParams.status}
              onChange={(_value, option) => handleChangeFilter('status', option.value)}
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
          records={data?.vehicles || []}
          fetching={isLoading || isFetching}
          selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={data?.pagination?.totalVehicles || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>
{/* // delete modal */}

     <ConfirmationModal
     title="Delete Vehicle"
     message="Are you sure you want to delete this vehicle?"
     open={openDeleteModal}
     onClose={handleCloseDeleteModal}
     onSubmit={handleDeleteVehicle}
    //  isLoading={loadingDelete}
     />
    </>
  );
}