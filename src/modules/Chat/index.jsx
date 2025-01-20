'use client';
import React from 'react';
import styles from './Chat.module.css';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useChat from './useChat';
import { getColumns, chatData } from './Chat.data';
import { IconPlus } from '@/assets/icons';

export default function Chat() {
  const {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickExternalLink,
    users,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
    totalUsers,
  } = useChat();

  const columns = getColumns(handleClickExternalLink)

console.log('users>>>', users)
  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search
              setSearchBy={setSearchBy}
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
        </Box>
      </Box>
      <Box>
      <DataTable
          columns={columns}
          records={users || []}
          totalRecords={totalUsers}
          recordsPerPage={10}
          page={currentPage}
          onPageChange={handlePageChange}
          loading={isLoading}
        />
      </Box>
    </>
  )
}
