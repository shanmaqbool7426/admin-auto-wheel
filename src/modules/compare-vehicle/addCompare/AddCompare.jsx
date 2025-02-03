import React from 'react';
import { Grid, Group, Box } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { DataTable } from '@/components/DataTable';
import Search from '@/components/Search';
import useAddCompare from '../AddComparison/useAddComparison';
import { getColumns } from './data';
import styles from './AddCompare.module.css';
import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';

export default function AddCompare({ open, setOnClose }) {
  const { data: roles } = useGetRolesQuery();
  const user = getSafeUserFromCookie('user');
  const permissions = roles?.data?.roles.find(
    (role) => role.name?.toLowerCase() === user.roles?.toLowerCase()
  );

  const hasEditPermission = permissions?.permissions?.compareVehicle?.edit;


  const {
    form,
    isLoading,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
    handleSubmit,
  } = useAddCompare(setOnClose);

  const columns = getColumns(
    hasEditPermission ? handleAddToCompare : null, 
    form.values.selectedVehicles
  );

  const renderSearchAndFilter = () => (
    <Grid.Col span={12}>
      <Box className={styles.searchContainer}>
        <Search
          placeholder="Search vehicles..."
          onChange={(value) => {/* Add search logic */}}
        />
        <FormField
          type="select"
          placeholder="Filter by type"
          data={[
            { value: 'car', label: 'Cars' },
            { value: 'bike', label: 'Bikes' },
            { value: 'truck', label: 'Trucks' }
          ]}
          value={form.values.type}
          onChange={(value) => form.setFieldValue('type', value)}
        />
      </Box>
    </Grid.Col>
  );

  const renderVehicleList = () => (
    <Grid.Col span={12}>
      <DataTable
        columns={columns}
        records={[]} // Add your vehicle data here
        totalRecords={0}
        page={1}
        onPageChange={() => {}} // Add pagination logic
        recordsPerPage={10}
      />
    </Grid.Col>
  );

  const renderSelectedVehicles = () => (
    form.values.selectedVehicles.length > 0 && (
      <Grid.Col span={12}>
        <Box className={styles.selectedVehicles}>
          <Group position="apart">
            <Group>
              {form.values.selectedVehicles.map(vehicle => (
                <Box key={vehicle._id} className={styles.vehicleCard}>
                  <img 
                    src={vehicle.defaultImage} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                  />
                  {hasEditPermission && (
                    <CustomButton
                      size="xs"
                      color="red"
                      variant="subtle"
                      onClick={() => handleRemoveFromCompare(vehicle._id)}
                    >
                      Remove
                    </CustomButton>
                  )}
                </Box>
              ))}
            </Group>
            {hasEditPermission && (
              <CustomButton
                variant="subtle"
                color="red"
                onClick={handleClearCompare}
              >
                Clear All
              </CustomButton>
            )}
          </Group>
        </Box>
      </Grid.Col>
    )
  );

  const renderActions = () => (
    <Grid.Col span={12}>
      <Group position="right">
        <CustomButton
          variant="subtle"
          onClick={() => setOnClose(false)}
        >
          Cancel
        </CustomButton>
        {hasEditPermission && (
          <CustomButton
            type="submit"
            loading={isLoading}
            disabled={form.values.selectedVehicles.length < 2}
          >
            Compare Vehicles
          </CustomButton>
        )}
      </Group>
    </Grid.Col>
  );

  return (
    <CustomModal
      title="Compare Vehicles"
      open={open}
      onClose={() => setOnClose(false)}
      size="xl"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="lg">
          {renderSearchAndFilter()}
          {renderVehicleList()}
          {renderSelectedVehicles()}
          {renderActions()}
        </Grid>
      </form>
    </CustomModal>
  );
}