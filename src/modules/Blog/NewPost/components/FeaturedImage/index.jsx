import React from 'react';
import { Grid, Box, FileButton, Button, Image, Group } from '@mantine/core';
import Card from '@/components/Card';

export default function FeaturedImage({ form, isEdit }) {
  const handleFileChange = (file) => {
    if (file) {
      form.setFieldValue('imageUrl', file);
      form.setFieldValue('isNewImage', true);
    }
  };

  const handleRemoveImage = () => {
    form.setFieldValue('imageUrl', null);
    form.setFieldValue('isNewImage', false);
    form.setFieldValue('existingImageUrl', null);
  };

  const getImageSource = () => {
    if (form.values.isNewImage && form.values.imageUrl instanceof File) {
      return URL.createObjectURL(form.values.imageUrl);
    }
    return form.values.existingImageUrl || form.values.imageUrl;
  };

  const hasImage = form.values.imageUrl || form.values.existingImageUrl;

  return (
    <Card title={'Featured Image'}>
      <Grid gutter="20px">
        <Grid.Col span={12}>
          <Group position="center" spacing="sm">
            <FileButton 
              onChange={handleFileChange} 
              accept="image/png,image/jpeg,image/jpg"
            >
              {(props) => (
                <Button {...props} fullWidth>
                  {hasImage ? 'Change Image' : 'Upload Image'}
                </Button>
              )}
            </FileButton>

            {hasImage && (
              <Button 
                color="red" 
                variant="outline"
                onClick={handleRemoveImage}
              >
                Remove
              </Button>
            )}
          </Group>
          
          {form.errors.imageUrl && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.errors.imageUrl}
            </div>
          )}

          {hasImage && (
            <Box mt="md">
              <Image
                src={getImageSource()}
                alt="Preview"
                radius="md"
                height={200}
                fit="cover"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                }}
              />
              {isEdit && !form.values.isNewImage && (
                <Box mt={5} sx={{ fontSize: '12px', color: 'gray' }}>
                  Current uploaded image
                </Box>
              )}
            </Box>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );
}