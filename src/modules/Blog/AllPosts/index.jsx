"use client"
import React, { Suspense } from 'react';
import styles from './AllPosts.module.css';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useAllPosts from './useAllPosts';
import { getColumns, postsData } from './data';
import { IconPlus } from '@/assets/icons';
import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';

export default function AllPosts() {
  const { data: roles } = useGetRolesQuery();
  const user = getSafeUserFromCookie();
  const permissions = roles?.data?.roles.find(
    (role) => role.name?.toLowerCase() === user?.roles?.toLowerCase()
  );

  // const hasEditPermission = permissions?.permissions?.blog?.edit;
  const hasEditPermission = true

  const {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    filterParams,
    handleChangeFilter,

    editableRowData,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickDuplicate,
    handleSelectRow,
    handleBulkAction,
    posts,
    totalPosts,
    loadingPosts,
    fetchingPosts,
    catgData,
    error,
    statusCountsData,
    handleNavigateNewPost,
  } = useAllPosts();
  const columns = getColumns(handleClickEditRow, handleClickDeleteRow, handleClickDuplicate)
  const [bulkActionValue, setBulkActionValue] = React.useState('');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search
              setSearchBy={setSearchBy}
            />
          </Box>
          {hasEditPermission && (
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
          )}
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="categories"
              data={catgData}
              placeholder="Category"
              checkIconPosition="right"
              value={filterParams.news}
              onChange={(_value, option) => handleChangeFilter('news', option.value)}
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
          {hasEditPermission && (
            <Box>
              <CustomButton
                leftSection={<IconPlus />}
                onClick={handleNavigateNewPost}
              >
                Create Post
              </CustomButton>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={hasEditPermission ? columns : columns.filter(col => !['edit', 'delete', 'duplicate'].includes(col.key))}
          records={posts}
          fetching={loadingPosts || fetchingPosts}
          selection={hasEditPermission}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={totalPosts}
          page={page}
          onPageChange={setPage}
        />
      </Box>
    </Suspense>
  )
}
