'use client';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddColorMutation, useUpdateColorMutation } from '@/services/color';

export default function useAddColor({ selectedColor, onClose }) {
  const [addColor, { isLoading: isAdding }] = useAddColorMutation();
  const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation();

  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      order: 0,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      order: (value) => {
        if (value < 0) return 'Order must be a positive number';
        if (!Number.isInteger(Number(value))) return 'Order must be a whole number';
        return null;
      },
    },
  });

  useEffect(() => {
    if (selectedColor) {
      form.setValues({
        title: selectedColor.title || '',
        type: selectedColor.type || '',
        order: selectedColor.order || 0,
      });
    } else {
      form.reset();
    }
  }, [selectedColor]);

  const handleSubmit = async (values) => {
    try {
      if (selectedColor) {
        await updateColor({
          id: selectedColor._id,
          body: values
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Color updated successfully',
          color: 'green',
        });
      } else {
        await addColor(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Color added successfully',
          color: 'green',
        });
      }
      
      form.reset();
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: isAdding || isUpdating,
  };
}
