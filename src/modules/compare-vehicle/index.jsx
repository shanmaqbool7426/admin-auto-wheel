'use client';
import { Box } from '@mantine/core';
import DataTable from '@/components/DataTable';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import { getColumns } from './data';
import CompareBar from './CompareBar';
import useCompareVehicles from './useCompareVehicles';
import styles from './CompareBar.module.css';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@tabler/icons-react';
import AddCompare from './addCompare/AddCompare';

export default function CompareVehiclesModule() {
  const {
    page,
    setPage,
    searchBy,
    handleSearch,
    selectedVehicles,
    maxVehicles,
    vehiclesData,
    loadingVehicles,
    isFetching,
    loadingCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
    handleCompare,
    setFilterParams
  } = useCompareVehicles();

  const columns = getColumns(handleAddToCompare, selectedVehicles);

  
  return (
    <Box className={styles.container}>
      {/* Filter Bar */}
      <Box className={styles.filterBar}>
        <Box className={styles.searchSection}>
          <Search
            value={searchBy}
            onChange={handleSearch}
            placeholder="Search vehicles..."
          />
        </Box>
        <Box className={styles.filterSection}>
          <FormField
            type="select"
            placeholder="Filter by type"
            data={[
              { value: 'car', label: 'Cars' },
              { value: 'bike', label: 'Bikes' },
              { value: 'truck', label: 'Trucks' }
            ]}
            onChange={(value) => setFilterParams(prev => ({ ...prev, type: value }))}
          />

          <CustomButton
            leftSection={<IconPlus size={16} />}
            onClick={() => setIsCompareModalOpen(true)}
          >
            Compare Vehicles
          </CustomButton>
        </Box>
      </Box>

      <AddCompare
        open={isCompareModalOpen}
        setOnClose={setIsCompareModalOpen}
      />

      {/* Data Table */}
      <Box className={styles.tableContainer}>
        <DataTable
          columns={columns}
          records={vehiclesData?.data?.results || []}
          totalRecords={vehiclesData?.data?.count || 0}
          page={page}
          onPageChange={setPage}
          recordsPerPage={10}
          fetching={loadingVehicles || isFetching}
        />
      </Box>

      {/* Compare Bar */}
      {selectedVehicles.length > 0 && (
        <CompareBar
          selectedVehicles={selectedVehicles}
          maxVehicles={maxVehicles}
          onRemove={handleRemoveFromCompare}
          onClear={handleClearCompare}
          onCompare={handleCompare}
          isLoading={loadingCompare}
        />
      )}
    </Box>
  );
}