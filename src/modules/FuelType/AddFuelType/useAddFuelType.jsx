'use client';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddFuelTypeMutation, useUpdateFuelTypeMutation } from '@/services/fuel-type';

export default function useAddFuelType({ selectedFuelType, onClose }) {
  const [addFuelType, { isLoading: isAdding }] = useAddFuelTypeMutation();
  const [updateFuelType, { isLoading: isUpdating }] = useUpdateFuelTypeMutation();

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
    if (selectedFuelType) {
      form.setValues({
        title: selectedFuelType.title || '',
        type: selectedFuelType.type || '',
        order: selectedFuelType.order || 0,
      });
    } else {
      form.reset();
    }
  }, [selectedFuelType]);

  const handleSubmit = async (values) => {
    try {
      if (selectedFuelType) {
        await updateFuelType({
          id: selectedFuelType._id,
          body: values
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Fuel Type updated successfully',
          color: 'green',
        });
      } else {
        await addFuelType(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Fuel Type added successfully',
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