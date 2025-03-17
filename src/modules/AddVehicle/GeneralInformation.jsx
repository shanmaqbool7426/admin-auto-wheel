import { Grid, NumberInput, MultiSelect, TextInput, Textarea, Box, Image, SimpleGrid, Title, Text, Flex } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useUploadImageMutation } from '@/services/vehicle-manage';
import { useState, useEffect } from 'react';
import { DateInput, DatePickerInput  } from '@mantine/dates';
import { IconX, IconStar, IconStarFilled } from '@tabler/icons-react';
import classes from './GeneralInformation.module.css';
import { useAddVehicle } from './useAddVehicle';
import { notifications } from '@mantine/notifications';

export const GeneralInformation = ({ form }) => {
  const{colors} = useAddVehicle()
  const [uploadImage] = useUploadImageMutation();
  const [previews, setPreviews] = useState([]);
  const [brochureFile, setBrochureFile] = useState(null);
  useEffect(() => {
    setPreviews(form.values.images)
  }, [])

  console.log(">>>colors",colors);

  /**
   * Handles image drop from user.
   * 1. Creates blob URLs for the dropped images.
   * 2. Uploads the images to the server.
   * 3. Updates the form's images field with the uploaded image URLs.
   * 4. Sets the first image as default if no default image exists.
   * @param {File[]} files - The dropped images.
   */
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
        console.log(">>>responses",responses);
        const imageUrls = responses.map(response => response?.data[0]);
        const updatedImages = [...(form.values.images || []), ...imageUrls];
        
        form.setFieldValue('images', updatedImages);
        console.log(">>>updatedImages",updatedImages);
        
        // Set first image as default if no default exists
        console.log(">>>updatedImages..",form.values.defaultImage);

        if (form.values.defaultImage == "null") {
          console.log(">>>>>>>>>");
          form.setFieldValue('defaultImage', updatedImages[0]);
        }
      } catch (error) {
        console.error('Failed to upload images:', error);
      }
    }
  };

  const setDefaultImage = (index) => {
    const selectedImage = form.values.images[index];
    form.setFieldValue('defaultImage', selectedImage);
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const currentImages = [...form.values.images];
    const removedImage = currentImages[index];
    currentImages.splice(index, 1);
    form.setFieldValue('images', currentImages);

    // If removing default image, set new default to first remaining image
    if (removedImage === form.values.defaultImage) {
      form.setFieldValue('defaultImage', currentImages[0] || null);
    }
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
              {form.values.defaultImage === form.values.images[index] ? (
                <IconStarFilled size={16} />
              ) : (
                <IconStar size={16} />
              )}
            </Box>
            {form.values.defaultImage !== form.values.images[index] && (
              <Box
                className={classes.actionButton}
                onClick={() => removeImage(index)}
              >
                <IconX size={16} />
              </Box>
            )}
          </Box>
          <Text className={classes.defaultLabel}>
            {form.values.defaultImage === form.values.images[index] ? 'Default' : ''}
          </Text>
        </Box>
      </Box>
    </Box>
  ));

  // Add these transformations to handle the conversion between string and array
  const prosToString = (prosArray) => {
    if (!prosArray || !Array.isArray(prosArray)) return '';
    return prosArray.join('\n');
  };

  const stringToPros = (prosString) => {
    if (!prosString) return [];
    return prosString.split('\n').filter(item => item.trim() !== '');
  };

  /**
   * Handles brochure file upload
   * @param {File[]} files - The dropped PDF file
   */
  const handleBrochureDrop = async (files) => {
    if (files?.length) {
      const file = files[0]; // Take only the first file
      setBrochureFile(file.name);
      
      try {
        const formData = new FormData();
        formData.append('images', file);
        
        const response = await uploadImage(formData).unwrap();
        if (response?.data && response.data[0]) {
          form.setFieldValue('  ', response.data[0]);
          notifications.show({
            title: 'Success',
            message: 'Brochure uploaded successfully',
            color: 'green',
          });
        }
      } catch (error) {
        console.error('Failed to upload brochure:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to upload brochure',
          color: 'red',
        });
      }
    }
  };

  return (
    <Grid>
      {/* Price Information */}
      <Grid.Col span={6}>
        <NumberInput
          label="Minimum Price"
          required
          value={form.values.minPrice}
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
          value={form.values.maxPrice}
          min={0}
          placeholder="Enter maximum price"
          {...form.getInputProps('maxPrice')}
          name="maxPrice"
        />
      </Grid.Col>

      {/* Colors and Release Date */}
      <Grid.Col span={6}>
      <NumberInput
          label="Price"
          required
          value={form.values.price}
          min={0}
          placeholder="Enter maximum price"
          {...form.getInputProps('price')}
          name="price"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        {/* <TextInput
          value={new Date()}
          label="Release Date"
          type="date"
          {...form.getInputProps('releaseDate')}
          name="releaseDate"
        /> */}

<DateInput clearable  {...form.getInputProps('releaseDate')} value={new Date(form.values.releaseDate)} label="Date input" placeholder="Date input" />

      </Grid.Col>

      {/* Description */}
      <Grid.Col span={12}>
        <Textarea
          label="Description"
          required
          minRows={4}
          placeholder="Detailed description of the vehicle..."
          value={form.values.description}
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
              value={form.values.images}
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

      {/* Brochure Upload */}
      <Grid.Col span={12}>
        <Box mb="xl">
          <Title order={4} mb="md">Upload Brochure</Title>
          <Dropzone
            accept={PDF_MIME_TYPE}
            onDrop={handleBrochureDrop}
            maxFiles={1}
            maxSize={5 * 1024 * 1024} // 5MB max size
            className={classes.dropzone}
          >
            <Flex direction="column" align="center" justify="center">
              <Image
                src="/upload-pdf.png" 
                alt="Upload PDF"
                width={50}
                height={5}
                className={classes.uploadImage}
              />
              <Text size="sm" mt="xs">
                {brochureFile ? `Selected: ${brochureFile}` : 'Drag & drop a PDF file or click to select'}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                PDF file only, max 5MB
              </Text>
            </Flex>
          </Dropzone>
          
          {form.values.brochureLink && !brochureFile && (
            <Flex align="center" mt="sm">
              <Text size="sm">Current brochure: </Text>
              <Text 
                component="a" 
                href={form.values.brochureLink} 
                target="_blank" 
                ml={5}
                color="blue"
                style={{ textDecoration: 'underline' }}
              >
                View brochure
              </Text>
            </Flex>
          )}
        </Box>
      </Grid.Col>

      {/* Pros and Cons */}
      <Grid.Col span={6}>
        <Textarea
          label="Pros"
          placeholder="Enter pros (one per line)"
          minRows={3}
          value={form.values.pros}
          onChange={(event) => {
            // Store as string in the form
            form.setFieldValue('pros', event.currentTarget.value);
            
            // Also update the transformed value for submission
            const prosArray = stringToPros(event.currentTarget.value);
            form.setFieldValue('prosArray', prosArray);
          }}
          name="pros"
          description="Enter each advantage in a new line. These will be saved as separate items."
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea
          label="Cons"
          placeholder="Enter cons (one per line)"
          minRows={3}
          value={form.values.cons}
          onChange={(event) => {
            // Store as string in the form
            form.setFieldValue('cons', event.currentTarget.value);
            
            // Also update the transformed value for submission
            const consArray = stringToPros(event.currentTarget.value);
            form.setFieldValue('consArray', consArray);
          }}
          name="cons"
          description="Enter each disadvantage in a new line. These will be saved as separate items."
        />
      </Grid.Col>

      {/* FAQs */}
      <Grid.Col span={12}>
        {/* <Textarea
          label="FAQs"
          placeholder="Q: Question?\nA: Answer"
          minRows={4}
          {...form.getInputProps('faqs')}
          name="faqs"
          description="Format: Q: Question?\nA: Answer"
        /> */}
      </Grid.Col>

      {/* Brochure Link */}
      {/* Remove or comment out this section:
      <Grid.Col span={12}>
        <TextInput
          label="Brochure Link"
          placeholder="URL to vehicle brochure"
          value={form.values.brochureLink}
          {...form.getInputProps('brochureLink')}
          name="brochureLink"
        />
      </Grid.Col>
      */}

             <Grid.Col span={12}>
          <MultiSelect
            label="Available Colors"
            placeholder="Select available colors"
            data={colors}
            searchable
            clearable
            {...form.getInputProps('colorsAvailable')}
            name="colorsAvailable"
          />
        </Grid.Col>
    </Grid>
  );
};

export default GeneralInformation;