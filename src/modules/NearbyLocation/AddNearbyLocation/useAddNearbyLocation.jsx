'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddNearbyLocationMutation, useUpdateNearbyLocationMutation } from '@/services/near-by-location';
import { useUploadImageMutation } from '@/services/vehicle-manage';

export default function useAddNearbyLocation({ selectedLocation, onClose }) {
  const [addNearbyLocation, { isLoading: isAdding }] = useAddNearbyLocationMutation();
  const [updateNearbyLocation, { isLoading: isUpdating }] = useUpdateNearbyLocationMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      image: null,
      slug: '',
      order: 0,
      status: true,
    },
    validate: {},  
  });

  useEffect(() => {
    if (selectedLocation) {
      form.setValues({
        title: selectedLocation.title || '',
        description: selectedLocation.description || '',
        slug: selectedLocation.slug || '',
        image: selectedLocation.image || '',
        order: selectedLocation.order || 0,
        status: selectedLocation.status ?? true,
      });
      setImagePreview(selectedLocation.image || null);
    } else {
      form.reset();
      setImagePreview(null);
    }
  }, [selectedLocation]);

  const handleImageChange = async (file) => {
    if (file) {
      try {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
 
        const formData = new FormData();
        formData.append('images', file);
        
        const response = await uploadImage(formData).unwrap();
        
        form.setFieldValue('image', response?.data[0]);
        notifications.show({
          title: 'Success',
          message: 'Image uploaded successfully',
          color: 'green',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: error?.data?.message || 'Failed to upload image',
          color: 'red',
        });
        handleRemoveImage();
      }
    }
  };

  const handleRemoveImage = () => {
    form.setFieldValue('image', null);
    form.setFieldValue('image', '');
    if (imagePreview && !selectedLocation?.image) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const handleSubmit = async (values) => {
    try {
      const locationData = {
        title: values.title,
        description: values.description,
        image: values.image,
        slug: values.slug,
        order: values.order,
        status: values.status,
      };

      if (selectedLocation) {
        await updateNearbyLocation({
          id: selectedLocation._id,
          body: locationData
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Nearby location updated successfully',
          color: 'green',
        });
      } else {
        await addNearbyLocation(locationData).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Nearby location added successfully',
          color: 'green',
        });
      }
      
      if (imagePreview && !selectedLocation?.image) {
        URL.revokeObjectURL(imagePreview);
      }
      form.reset();
      setImagePreview(null);
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && !selectedLocation?.image) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, selectedLocation]);

  return {
    form,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    imagePreview,
    isLoading: isAdding || isUpdating || isUploading,
  };
}