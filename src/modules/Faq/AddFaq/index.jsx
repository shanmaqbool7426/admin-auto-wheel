import React from 'react';
import { Grid } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import useAddFaq from './useAddFaq';

export default function AddFaq({ open, onClose, editData }) {
  const { form, handleSubmit, isLoading } = useAddFaq({ editData, onClose });

  return (
    <CustomModal
      title={editData ? 'Edit FAQ' : 'Add New FAQ'}
      open={open}
      onClose={onClose}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="30px">
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
              label="Question"
              type="text"
              required
              placeholder="Enter question"
              {...form.getInputProps('question')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Answer"
              type="textarea"
              required
              placeholder="Enter answer"
              rows={4}
              {...form.getInputProps('answer')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FormField
              label="Status"
              type="switch"
              {...form.getInputProps('status', { type: 'checkbox' })}
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
                ? (editData ? 'Updating...' : 'Adding...')
                : (editData ? 'Update FAQ' : 'Add New FAQ')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  );
}