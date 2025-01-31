'use client';
import { Box, Loader } from '@mantine/core';
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
import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';
import { usePermissions } from '@/hooks/usePermissions';

export default function CompareVehiclesModule() {
  const { hasPermission, isLoading: isLoadingPermissions } = usePermissions();
  const hasEditPermission = hasPermission('compareVehicle', 'edit');

  // Early return while permissions are loading
  if (isLoadingPermissions) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </Box>
    );
  }

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

  const columns = getColumns(
    hasEditPermission ? handleAddToCompare : null, 
    selectedVehicles
  );

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

          {hasEditPermission && (
            <CustomButton
              leftSection={<IconPlus size={16} />}
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare Vehicles
            </CustomButton>
          )}
        </Box>
      </Box>

      {hasEditPermission && (
        <AddCompare
          open={isCompareModalOpen}
          setOnClose={setIsCompareModalOpen}
        />
      )}

      <Box className={styles.tableContainer}>
        <DataTable
          columns={hasEditPermission ? columns : columns.filter(col => !['compare'].includes(col.key))}
          records={vehiclesData?.data?.results || []}
          totalRecords={vehiclesData?.data?.count || 0}
          page={page}
          onPageChange={setPage}
          recordsPerPage={10}
          fetching={loadingVehicles || isFetching}
        />
      </Box>

      {hasEditPermission && selectedVehicles.length > 0 && (
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