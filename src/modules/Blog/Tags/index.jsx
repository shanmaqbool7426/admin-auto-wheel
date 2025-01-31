'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useTags from './useTags';
import { getColumns } from './data';
import { IconPlus } from '@/assets/icons';
import styles from './Tags.module.css';
import AddTag from './AddTag';
import ConfirmationModal from '@/components/ConfirmationModal';


export default function Tags() {
  const {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    tagsData,
    isLoading,
    isFetching,
    setSearchBy,
    filterParams,
    handleChangeFilter,

    // Delete Single
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleSubmitDelete,

    // Delete Bulk
    loadingBulkDelete,
    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteTags,


    isTagModalOpen,
    setIsTagModalOpen,
    selectedTag,
    setSelectedTag,

    handleClickEditRow,
    handleUpdateTag,
    isUpdating,
  } = useTags();

  const columns = getColumns(handleClickEditRow, handleOpenModalDelete);

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search
              setSearchBy={setSearchBy}
              placeholder="Search tags..."
            />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              disabled={selectedRecords?.length === 0}
              type="select"
              name="actions"
              data={[
                { value: 'delete', label: 'Delete' },
              ]}
              placeholder="Bulk Action"
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
              placeholder="Sort by date"
              value={filterParams?.sortOrder}
              onChange={(_value, option) => handleChangeFilter('sortOrder', option.value)}
            />
          </Box>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => setIsTagModalOpen(true)}
          >
            Add New Tag
          </CustomButton>
        </Box>
      </Box>
      

      <DataTable
        columns={columns}
        records={tagsData?.data?.data}
        selection
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        totalRecords={tagsData?.data?.total || 0}
        page={page}
        onPageChange={setPage}
        fetching={isLoading || isFetching}
      />

      <AddTag
        open={isTagModalOpen}
        setOnClose={(value) => {
          setIsTagModalOpen(value);
          setSelectedTag(null);
        }}
        selectedTag={selectedTag}
        onUpdate={handleUpdateTag}
      />

      <ConfirmationModal
        title="Delete Categories"
        message="Are you sure you want to delete selected categories?"
        open={openBulkDeleteModal}
        onClose={handleCloseBulkDeleteModal}
        onSubmit={handleBulkDeleteTags}
        isLoading={loadingBulkDelete}
      />

      <ConfirmationModal
        title="Delete Category"
        message="Are you sure you want to delete selected category?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleSubmitDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}
