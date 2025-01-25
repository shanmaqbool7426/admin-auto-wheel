'use client';
import React from 'react';
import { Grid, Box, Image, ActionIcon,Select,FileInput  } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomModal from '@/components/CustomModal';
import { useAddBody } from './useAddBody';
import { IconUpload, IconTrash } from '@tabler/icons-react';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './AddBody.module.css';
const VEHICLE_TYPES = [
  { value: 'car', label: 'Car', key: 'car' },
  { value: 'bike', label: 'Bike', key: 'bike' },
  { value: 'truck', label: 'Truck', key: 'truck' }
];

export default function AddBody({ 
  modalTitle, 
  open, 
  onClose, 
  selectedBody 
}) {
  const {
    form,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    imagePreview,
    isLoading
  } = useAddBody({ selectedBody, onClose });


  console.log("modalTitle", modalTitle);
  return (
    <CustomModal
      title={modalTitle}
      open={open}
      onClose={onClose}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="30px">
          <Grid.Col span={12}>
            <FormField
              label="Title"
              required
              type="text"
              placeholder="Enter body title"
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Select
              label="Type"
              required
              placeholder="Select body type"
              data={[
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Box className={styles.imageUpload}>
              <FileInput
                label="Body Image"
                required={!selectedBody}
                placeholder="Choose image"
                {...form.getInputProps('bodyImage')}
                accept="image/*"
                icon={<IconUpload size={14} />} 
                onChange={handleImageChange}
                error={form.errors.bodyImage}
              />

              {imagePreview && (
                <Box mt="sm" className={styles.previewContainer}>
                  <Image
                    src={imagePreview}
                    alt="Body preview"
                    height={100}
                    fit="contain"
                    radius="sm"
                    className={styles.preview}
                  />
                  <ActionIcon
                    variant="filled"
                    color="red"
                    onClick={handleRemoveImage}
                    className={styles.removeButton}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Box>
              )}
            </Box>
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
                ? (modalTitle === 'Edit Body Type' ? 'Updating...' : 'Adding...')
                : (modalTitle === 'Edit Body Type' ? 'Update Body' : 'Add New Body')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  );
} 