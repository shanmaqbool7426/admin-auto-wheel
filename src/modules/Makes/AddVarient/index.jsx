// auto-wheel-admin/src/modules/Makes/AddVariant/index.jsx
import React from 'react';
import CustomModal from '@/components/CustomModal';
import { Box, Group, Stack } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@tabler/icons-react';
import useAddVariant from './useAddVariant';

export default function AddVariant({ open, setOnClose, editData }) {
  const {
    form,
    handleSubmit,
    isLoading,
    makesData,
    filteredMakes,
    filteredModels,
  } = useAddVariant(setOnClose, editData);

  const isEditMode = Boolean(editData);

  return (
    <CustomModal
      title={isEditMode ? "Edit Variant" : "Add New Variant"}
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
            label="Select Model"
            type="select"
            placeholder="Select a model"
            data={filteredModels}
            disabled={!form.values.makeId}
            required
            {...form.getInputProps('modelId')}
          />

          <FormField
            label="Variant Name"
            type="text"
            placeholder="Enter variant name"
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
              {isEditMode ? 'Update Variant' : 'Add Variant'}
            </CustomButton>
          </Group>
        </Stack>
      </form>
    </CustomModal>
  );
}