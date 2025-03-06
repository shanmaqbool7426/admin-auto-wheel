'use client';
import React from 'react';
import { Box, ActionIcon, Drawer, Grid, Autocomplete } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useLocations from './useLocations';
import { getColumns } from './data';
import { IconPlus } from '@/assets/icons';
import styles from './Locations.module.css';
import AddLocation from './AddLocation';
import ConfirmationModal from '@/components/ConfirmationModal';
import { IconFilter } from '@tabler/icons-react';
import FilterDrawer from './FilterDrawer';
import { useGetStatesOfCountry } from '@/services/location';


export default function Locations() {
  const {
    page,
    setPage,
    selectedRecords,
    setSelectedRecords,
    locationsData,
    loadingGetLocation,
    fetchingGetLocation,
    setSearchBy,
    setIsLocationModalOpen,
    isLocationModalOpen,

    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteLocations,
    loadingBulkDelete,

    openFilterDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSubmit,
    filterForm,
  } = useLocations();

  const columns = getColumns();

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
              disabled={selectedRecords?.length === 0}
              type="select"
              name="actions"
              data={[
                { value: 'delete', label: 'Delete' },
              ]}
              placeholder="Bulk Action"
              checkIconPosition="right"
              onChange={(_value, option) => handleBulkAction(option.value)}
            />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <Box className={styles.filterButton} onClick={handleOpenDrawer}>
            <IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} /> Filter
          </Box>

          <Box>
            <CustomButton
              leftSection={<IconPlus />}
              onClick={() => setIsLocationModalOpen(true)}
            >
              Add Location
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={locationsData?.data?.locations || []}
          fetching={loadingGetLocation || fetchingGetLocation}
          selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          totalRecords={locationsData?.data?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      {/* Add New Tag Modal */}
      <AddLocation
        open={isLocationModalOpen}
        setOnClose={setIsLocationModalOpen}
      />

      <ConfirmationModal
        title="Delete Location"
        message="Are you sure you want to delete selected locations?"
        open={openBulkDeleteModal}
        onClose={handleCloseBulkDeleteModal}
        onSubmit={handleBulkDeleteLocations}
        isLoading={loadingBulkDelete}
      />

      <FilterDrawer
        open={openFilterDrawer}
        onClose={handleCloseDrawer}
        form={filterForm}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
