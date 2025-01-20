// auto-wheel-admin/src/modules/Makes/AddModel/index.jsx
import React from 'react';
import CustomModal from '@/components/CustomModal';
import { Box, Group, Stack } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@tabler/icons-react';
import useAddModel from './useAddModel';

export default function AddModel({ open, setOnClose, editData }) {
  const {
    form,
    handleSubmit,
    isLoading,
    makesData,
    filteredMakes,
  } = useAddModel(setOnClose, editData);

  const isEditMode = Boolean(editData);

  return (
    <CustomModal
      title={isEditMode ? "Edit Model" : "Add New Model"}
      open={open}
      onClose={() => {
        setOnClose(false);
        form.reset();
      }}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <FormField
            label="Vehicle Type"
            type="select"
            placeholder="Select vehicle type"
            data={[
              { value: 'car', label: 'Car' },
              { value: 'bike', label: 'Bike' },
              { value: 'truck', label: 'Truck' }
            ]}
            required
            {...form.getInputProps('type')}
          />

          <FormField
            label="Select Make"
            type="select"
            placeholder="Select a make"
            data={filteredMakes}
            disabled={!form.values.type}
            required
            {...form.getInputProps('makeId')}
          />

          <FormField
            label="Model Name"
            type="text"
            placeholder="Enter model name"
            required
            {...form.getInputProps('name')}
          />

          <Group position="apart" mt="xl">
            <CustomButton
              variant="subtle"
              color="red"
              onClick={() => {
                setOnClose(false);
                form.reset();
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              loading={isLoading}
              leftSection={isEditMode ? null : <IconPlus size={16} />}
              color="red"
            >
              {isEditMode ? 'Update Model' : 'Add Model'}
            </CustomButton>
          </Group>
        </Stack>
      </form>
    </CustomModal>
  );
}