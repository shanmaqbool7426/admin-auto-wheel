import React from 'react';
import { Grid, FileInput } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { IconUpload } from '@tabler/icons-react';
import useAddVideo from './useAddVideo';
import { useGetCategoriesQuery } from '@/services/blog/categories'
import styles from './AddVideo.module.css';

export default function AddVideo({ 
  title, 
  open, 
  onClose, 
  selectedVideo,
  form,
  handleSubmit,
  isLoading 
}) {
  const { data: categoriesData } = useGetCategoriesQuery();
  const {
    handleThumbnailChange,
    thumbnailPreview,
    categories
  } = useAddVideo({ selectedVideo ,form});

  console.log("categoriesData", categoriesData);
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
              placeholder="Enter video title"
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Description"
              type="textarea"
              placeholder="Enter video description"
              rows={4}
              {...form.getInputProps('description')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Video URL"
              required
              type="text"
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              {...form.getInputProps('url')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Category"
              required
              type="select"
              placeholder="Select video category"
              data={categoriesData?.data?.data?.map((category) => ({
                value: category.name,
                label: category.name
              })) || []}
              {...form.getInputProps('category')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FileInput
              label="Thumbnail Image"
              required={!selectedVideo}
              placeholder="Choose thumbnail"
              accept="image/*"
              icon={<IconUpload size={14} />}
              onChange={handleThumbnailChange}
              error={form.errors.thumbnail}
            />
            {thumbnailPreview && (
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className={styles.thumbnailPreview} 
              />
            )}
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
                ? (title === 'Edit Video' ? 'Updating...' : 'Adding...')
                : (title === 'Edit Video' ? 'Update Video' : 'Add New Video')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  );
}