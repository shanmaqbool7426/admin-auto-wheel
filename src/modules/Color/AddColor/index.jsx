import React from 'react';
import { Grid } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import useAddColor from './useAddColor';

export default function AddColor({ 
  title, 
  open, 
  onClose, 
  selectedColor 
}) {
  const {
    form,
    handleSubmit,
    isLoading
  } = useAddColor({ selectedColor, onClose });

  return (
    <CustomModal
      title={title}
      open={open}
      onClose={onClose}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="30px">
          <Grid.Col span={12}>
            <FormField
              label="Title"
              required
              type="text"
              placeholder="Enter color title"
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
          <FormField
              label="Vehicle Type"
              type="select"
              required
              data={[
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Display Order"
              type="number"
              min={0}
              placeholder="Enter display order"
              {...form.getInputProps('order')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomButton
              color="#1B84FF"
              fullWidth
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading
                ? (title === 'Edit Color' ? 'Updating...' : 'Adding...')
                : (title === 'Edit Color' ? 'Update Color' : 'Add New Color')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  );
}
