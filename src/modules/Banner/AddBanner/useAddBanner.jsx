'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddBannerMutation, useUpdateBannerMutation } from '@/services/banner';
import { useUploadImageMutation } from '@/services/vehicle-manage';

export default function useAddBanner({ selectedBanner, onClose }) {
  const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      image: null,
      link: '',
      order: 0,
      status: true,
    },
    validate: {
    //   title: (value) => (!value ? 'Title is required' : null),
    //   image: (value) => {
    //     // Only require image for new banners
    //     if (!selectedBanner && !value) {
    //       return 'Banner image is required';
    //     }
    //     return null;
    //   },
    },  
  });

  // Set initial values when editing
  useEffect(() => {
    if (selectedBanner) {
      form.setValues({
        title: selectedBanner.title || '',
        description: selectedBanner.description || '',
        link: selectedBanner.link || '',
        image: selectedBanner.image || '',
        order: selectedBanner.order || 0,
        status: selectedBanner.status ?? true,
      });
      setImagePreview(selectedBanner.image || null);
    } else {
      form.reset();
      setImagePreview(null);
    }
  }, [selectedBanner]);


  const handleImageChange = async (file) => {
    if (file) {
      try {
        // Show preview immediately
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
 
        // Upload image
        const formData = new FormData();
        formData.append('images', file);
        
        const response = await uploadImage(formData).unwrap();
        
        // Set the returned image URL
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
    if (imagePreview && !selectedBanner?.image) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const handleSubmit = async (values) => {
    try {
      // Prepare banner data
      const bannerData = {
        title: values.title,
        description: values.description,
        image: values.image, // Use the uploaded image URL
        link: values.link,
        order: values.order,
        status: values.status,
      };

      if (selectedBanner) {
        await updateBanner({
          id: selectedBanner._id,
          body: bannerData
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Banner updated successfully',
          color: 'green',
        });
      } else {
        await addBanner(bannerData).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Banner added successfully',
          color: 'green',
        });
      }
      
      // Clean up
      if (imagePreview && !selectedBanner?.image) {
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && !selectedBanner?.image) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, selectedBanner]);

  return {
    form,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    imagePreview,
    isLoading: isAdding || isUpdating || isUploading,
  };
}