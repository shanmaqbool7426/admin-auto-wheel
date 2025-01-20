import React, { useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import useAddMake from './useAddMake';
import { Box, Group, Text, Stack } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

export default function AddMake({ open, setOnClose, editData ,names}) {
  const {
    form,
    handleSubmit,
    isLoading,
    handleLogoUpload,
    logoPreview
  } = useAddMake(setOnClose, editData);

  const isEditMode = Boolean(editData);

  console.log('names',names)
  return (
    <CustomModal
      title={isEditMode ? "Edit Vehicle Make" : "Add New Vehicle Make"}
      open={open}
      onClose={() => setOnClose(false)}
      size="xl"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
        <Box>
            <Text mb={8}>Vehicle Type <span style={{ color: 'red' }}>*</span></Text>
            <FormField
              type="select"
              placeholder="Select vehicle type"
              data={[
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              {...form.getInputProps('type')}
              error={form.errors.type}
            />
          </Box>

          <Box>
            <Text mb={8}>Make Name <span style={{ color: 'red' }}>*</span></Text>
            <FormField
              type="text"
              name="name"
              value={form.values.name  && form.values.name || "SHAN"}
              placeholder="e.g., Toyota, Honda, BMW"
              {...form.getInputProps('name')}
              error={form.errors.name}
            />
          </Box>

       
          <Box>
            <Text mb={8}>Brand Logo</Text>
            <Box
              sx={(theme) => ({
                border: '1px dashed #E9ECEF',
                borderRadius: theme.radius.md,
                backgroundColor: '#F8F9FA',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#F1F3F5'
                }
              })}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
                id="logo-upload"
              />
              <label htmlFor="logo-upload" style={{ cursor: 'pointer', width: '100%' }}>
                <Box p={24} ta="center">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Brand logo" 
                      style={{ 
                        maxHeight: '120px',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }} 
                    />
                  ) : (
                    <>
                      <Text size="sm" mb={8}>
                        Drop your brand logo here or click to browse
                      </Text>
                      <Text size="xs" c="dimmed">
                        Accepts PNG, JPG up to 2MB
                      </Text>
                    </>
                  )}
                </Box>
              </label>
            </Box>
            {form.errors.companyImage && (
              <Text size="xs" c="red" mt={4}>
                {form.errors.companyImage}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={8}>Description</Text>
            <FormField
              type="textarea"
              placeholder="Brief description about the manufacturer..."
              rows={4}
              {...form.getInputProps('description')}
              error={form.errors.description}
            />
          </Box>

          <Group position="apart" mt="xl">
            <CustomButton
              variant="subtle"
              color="red"
              onClick={() => setOnClose(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              loading={isLoading}
              color="red"
            >
              {isEditMode ? 'Update Make' : 'Save Make'}
            </CustomButton>
          </Group>
        </Stack>
      </form>
    </CustomModal>
  );
}