'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddBodyMutation, useUpdateBodyMutation } from '@/services/bodies';
import { useUploadImageMutation } from '@/services/vehicle-manage';

export  function useAddBody({ selectedBody, onClose }) {
  const [addBody, { isLoading: isAdding }] = useAddBodyMutation();
  const [updateBody, { isLoading: isUpdating }] = useUpdateBodyMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      bodyImage: null,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      type: (value) => (!value ? 'Type is required' : null),
      bodyImage: (value) => {
        if (!selectedBody && !value) {
          return 'Body image is required';
        }
        return null;
      },
    },  
  });

  useEffect(() => {
    if (selectedBody) {
      form.setValues({
        title: selectedBody.title || '',
        type: selectedBody.type || '',
        bodyImage: selectedBody.bodyImage || '',
      });
      setImagePreview(selectedBody.bodyImage || null);
    } else {
      form.reset();
      setImagePreview(null);
    }
  }, [selectedBody]);

  const handleImageChange = async (file) => {
    if (file) {
      try {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
 
        const formData = new FormData();
        formData.append('images', file);
        
        const response = await uploadImage(formData).unwrap();
        form.setFieldValue('bodyImage', response?.data[0]);

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
    form.setFieldValue('bodyImage', null);
    if (imagePreview && !selectedBody?.bodyImage) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const handleSubmit = async (values) => {
    try {
      const bodyData = {
        title: values.title,
        type: values.type,
        bodyImage: values.bodyImage,
      };

      if (selectedBody) {
        await updateBody({
          id: selectedBody._id,
          body: bodyData
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Body updated successfully',
          color: 'green',
        });
      } else {
        await addBody(bodyData).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Body added successfully',
          color: 'green',
        });
      }
      
      if (imagePreview && !selectedBody?.bodyImage) {
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
      if (imagePreview && !selectedBody?.bodyImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, selectedBody]);

  return {
    form,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    imagePreview,
    isLoading: isAdding || isUpdating || isUploading,
  };
} 