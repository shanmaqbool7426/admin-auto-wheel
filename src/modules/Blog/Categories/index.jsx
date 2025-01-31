'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useCategories from './useCategories';
import { getColumns } from './data';
import { IconPlus } from '@/assets/icons';
import styles from './Categories.module.css';
import AddCategory from './AddCategory';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';

export default function Categories() {
  const { data: roles } = useGetRolesQuery();
  const user = getSafeUserFromCookie();
  const permissions = roles?.data?.roles.find(
    (role) => role.name?.toLowerCase() === user?.roles?.toLowerCase()
  );

  const hasEditPermission = permissions?.permissions?.blog?.edit || false;

  const {
    page,
    setPage,
    isLoading,
    isFetching,
    categoriesData,
    selectedRecords,
    setSelectedRecords,
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
    handleBulkDeleteCategories,

    // Add/Edit Category
    modalTitle,
    openModalAddCatg,
    handleOpenModalAddCatg,
    handleCloseModalAddCatg,
    formAddCatg,
    loadingAddModal,
    handleSubmitAddCatg,
  } = useCategories();

  const columns = getColumns(
    hasEditPermission ? handleOpenModalAddCatg : null, 
    hasEditPermission ? handleOpenModalDelete : null
  );

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
          {hasEditPermission && (
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
          )}
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
            {hasEditPermission && (
              <Box>
                <CustomButton
                  leftSection={<IconPlus />}
                  onClick={() => handleOpenModalAddCatg('New Category', null)}
                >
                  Add New Category
                </CustomButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={hasEditPermission ? columns : columns.filter(col => !['edit', 'delete'].includes(col.key))}
          records={categoriesData?.data?.data || []}
          fetching={isLoading || isFetching}
          selection={hasEditPermission}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={categoriesData?.data?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      {hasEditPermission && (
        <>
          <AddCategory
            title={modalTitle}
            open={openModalAddCatg}
            onClose={handleCloseModalAddCatg}
            form={formAddCatg}
            handleSubmit={handleSubmitAddCatg}
            isLoading={loadingAddModal}
          />

          <ConfirmationModal
            title="Delete Categories"
            message="Are you sure you want to delete selected categories?"
            open={openBulkDeleteModal}
            onClose={handleCloseBulkDeleteModal}
            onSubmit={handleBulkDeleteCategories}
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
      )}
    </>
  );
}
