import React, { useState, useEffect } from 'react';
import { Grid, Image, ActionIcon, Box, FileInput } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { IconTrash,  } from '@/assets/icons';
import useAddBanner from './useAddBanner';
import styles from './AddBanner.module.css';
import { IconUpload } from '@tabler/icons-react';


export default function AddBanner({ 
  title, 
  open, 
  onClose, 
  selectedBanner 
}) {
  const {
    form,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    imagePreview,
    isLoading
  } = useAddBanner({ selectedBanner, onClose });

  return (
    <CustomModal
      title={title}
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
              placeholder="Enter banner title"
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Description"
              type="textarea"
              placeholder="Enter banner description"
              rows={4}
              {...form.getInputProps('description')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Link"
              type="text"
              placeholder="Enter banner link (optional)"
              {...form.getInputProps('link')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FormField
              label="Display Order"
              type="number"
              min={0}
              placeholder="Enter display order"
              {...form.getInputProps('order')}
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
            <Box className={styles.imageUpload}>
              <FileInput
                label="Banner Image"
                required={!selectedBanner}
                placeholder="Choose image"
                {...form.getInputProps('image')}
                accept="image/*"
                icon={<IconUpload  size={14} />} 
                onChange={handleImageChange}
                error={form.errors.image}
              />

              {imagePreview && (
                <Box className={styles.previewContainer}>
                  <Image
                    src={imagePreview}
                    alt="Banner preview"
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
                ? (title === 'Edit Banner' ? 'Updating...' : 'Adding...')
                : (title === 'Edit Banner' ? 'Update Banner' : 'Add New Banner')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  );
}