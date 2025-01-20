'use client';
import React from 'react';
import styles from './Comments.module.css';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import ConfirmationModal from '@/components/ConfirmationModal';
import useComments from './useComments';
import { getColumns } from './Comments.data';

export default function Comments() {
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
    handleDeleteComment,

    openBulkDeleteModal,
    handleOpenBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteComments,
  } = useComments();

  const columns = getColumns(handleOpenDeleteModal);

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search
              setSearchBy={setSearchBy}
            />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="actions"
              disabled={selectedRecords.length === 0}
              data={[
                { value: 'delete', label: 'Delete' },
              ]}
              placeholder="Bulk Action"
              checkIconPosition="right"
              value={filterParams.status}
              onChange={(_value, option) => handleBulkAction(option.value)}
            />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <Box className={styles.rightDropdown}>
            <FormField
              type="select"
              name="sortOrder"
              data={[
                { value: 'desc', label: 'Date, new to old' },
                { value: 'asc', label: 'Date, old to new' },
              ]}
              placeholder="Date, new to old"
              checkIconPosition="right"
              value={filterParams?.sortOrder}
              onChange={(_value, option) => handleChangeFilter('sortOrder', option.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={data?.data?.comments || []}
          fetching={isLoading || isFetching}
          selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={data?.data?.comments?.length || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <ConfirmationModal
        title="Delete Comment"
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteComment}
        isLoading={loadingBulkDelete}
      />

      <ConfirmationModal
        title="Delete Comments"
        message="Are you sure you want to delete selected comments?"
        open={openBulkDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleBulkDeleteComments}
        isLoading={loadingBulkDelete}
      />
    </>
  )
}
