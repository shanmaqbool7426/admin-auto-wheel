'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useFileManager from './useFileManager';
import { getColumns, mockRecentFiles } from './data';
import { IconPlus } from '@/assets/icons';
import styles from './FileManager.module.css';
import SidebarCard from './SidebarCard';

export default function Files() {
  const {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickAction,
    setIsLocationModalOpen,
    isLocationModalOpen
  } = useFileManager();

  const columns = getColumns(handleClickAction)

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
          <Box>
            <CustomButton
              leftSection={<IconPlus />}
              onClick={() => setIsLocationModalOpen(true)}
            >
              Create New
            </CustomButton>
          </Box>
        </Box>
      </Box>

      <Box className={styles.fileManagerRow}>

        <Box className={styles.fileMngContent}>

          <DataTable
            columns={columns}
            records={mockRecentFiles || []}
            enablePagination={false}
          />

        </Box>

        <Box className={styles.fileManagerSidebar}>
          <SidebarCard />
        </Box>
      </Box>

    </>
  )
}
