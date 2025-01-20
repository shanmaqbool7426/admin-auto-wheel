import { Grid, NumberInput, MultiSelect, TextInput, Textarea, Box, Image, SimpleGrid, Title, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useUploadImageMutation } from '@/services/vehicle-manage';
import { useState, useEffect } from 'react';
import { IconX, IconStar, IconStarFilled } from '@tabler/icons-react';
import classes from './GeneralInformation.module.css';

export const GeneralInformation = ({ form }) => {
  const [uploadImage] = useUploadImageMutation();
  const [previews, setPreviews] = useState([]);

  const handleFileDrop = async (files) => {
    if (files?.length) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);

      try {
        const uploadPromises = files.map(file => {
          const formData = new FormData();
          formData.append('images', file);
          return uploadImage(formData).unwrap();
        });

        const responses = await Promise.all(uploadPromises);
        const imageUrls = responses.map(response => response?.data[0]);
        form.setFieldValue('images', [...(form.values.images || []), ...imageUrls]);
      } catch (error) {
        console.error('Failed to upload images:', error);
      }
    }
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const currentImages = form.values.images || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    form.setFieldValue('images', newImages);
  };

  const setDefaultImage = (index) => {
    const currentImages = [...(form.values.images || [])];
    const [selectedImage] = currentImages.splice(index, 1);
    currentImages.unshift(selectedImage);
    form.setFieldValue('images', currentImages);
    form.setFieldValue('defaultImage', selectedImage);
  };

  const previewImages = previews.map((url, index) => (
    <Box key={index} className={classes.imageContainer}>
      <Box className={classes.imageWrapper}>
        <Image
          src={url}
          alt={`Preview ${index + 1}`}
          className={classes.previewImage}
        />
        <Box className={classes.imageOverlay}>
          <Box className={classes.imageActions}>
            <Box 
              className={classes.actionButton}
              onClick={() => setDefaultImage(index)}
            >
              {index === 0 ? <IconStarFilled size={16} /> : <IconStar size={16} />}
            </Box>
            <Box 
              className={classes.actionButton}
              onClick={() => removeImage(index)}
            >
              <IconX size={16} />
            </Box>
          </Box>
          <Text className={classes.defaultLabel}>
            {index === 0 ? 'Default' : ''}
          </Text>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <Grid>
      {/* Price Information */}
      <Grid.Col span={6}>
        <NumberInput
          label="Minimum Price"
          required
          min={0}
          placeholder="Enter minimum price"
          {...form.getInputProps('minPrice')}
          name="minPrice"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Maximum Price"
          required
          min={0}
          placeholder="Enter maximum price"
          {...form.getInputProps('maxPrice')}
          name="maxPrice"
        />
      </Grid.Col>

      {/* Colors and Release Date */}
      <Grid.Col span={6}>
        <MultiSelect
          label="Available Colors"
          placeholder="Select available colors"
          data={[
            'White', 'Black', 'Silver', 'Red', 'Blue',
            'Grey', 'Brown', 'Green', 'Gold', 'Bronze'
          ]}
          {...form.getInputProps('colors')}
          name="colors"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Release Date"
          type="date"
          {...form.getInputProps('releaseDate')}
          name="releaseDate"
        />
      </Grid.Col>

      {/* Description */}
      <Grid.Col span={12}>
        <Textarea
          label="Description"
          required
          minRows={4}
          placeholder="Detailed description of the vehicle..."
          {...form.getInputProps('description')}
          name="description"
        />
      </Grid.Col>

      {/* Images */}
      <Grid.Col span={12}>
        <Box mb="xl">
          <Title order={4} mb="lg">Upload Photos</Title>
          <Box className={classes.uploadContainer}>
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={handleFileDrop}
              className={classes.dropzone}
            >
              <Image
                src="/upload.png"
                alt="Upload"
                className={classes.uploadImage}
              />
            </Dropzone>

            {previews.length > 0 && (
              <SimpleGrid cols={4} spacing="md" mt="md">
                {previewImages}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Grid.Col>

      {/* Pros and Cons */}
      <Grid.Col span={6}>
        <Textarea
          label="Pros"
          placeholder="Enter pros (one per line)"
          minRows={3}
          {...form.getInputProps('pros')}
          name="pros"
          description="Enter each advantage in a new line"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea
          label="Cons"
          placeholder="Enter cons (one per line)"
          minRows={3}
          {...form.getInputProps('cons')}
          name="cons"
          description="Enter each disadvantage in a new line"
        />
      </Grid.Col>

      {/* FAQs */}
      <Grid.Col span={12}>
        <Textarea
          label="FAQs"
          placeholder="Q: Question?\nA: Answer"
          minRows={4}
          {...form.getInputProps('faqs')}
          name="faqs"
          description="Format: Q: Question?\nA: Answer"
        />
      </Grid.Col>

      {/* Brochure Link */}
      <Grid.Col span={12}>
        <TextInput
          label="Brochure Link"
          placeholder="URL to vehicle brochure"
          {...form.getInputProps('brochureLink')}
          name="brochureLink"
        />
      </Grid.Col>
    </Grid>
  );
};

export default GeneralInformation;