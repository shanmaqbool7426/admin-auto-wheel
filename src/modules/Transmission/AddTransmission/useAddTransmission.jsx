'use client';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddTransmissionMutation, useUpdateTransmissionMutation } from '@/services/transmission';

export default function useAddTransmission({ selectedTransmission, onClose }) {
  const [addTransmission, { isLoading: isAdding }] = useAddTransmissionMutation();
  const [updateTransmission, { isLoading: isUpdating }] = useUpdateTransmissionMutation();

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
    if (selectedTransmission) {
      form.setValues({
        title: selectedTransmission.title || '',
        type: selectedTransmission.type || '',
        order: selectedTransmission.order || 0,
      });
    } else {
      form.reset();
    }
  }, [selectedTransmission]);

  const handleSubmit = async (values) => {
    try {
      if (selectedTransmission) {
        await updateTransmission({
          id: selectedTransmission._id,
          body: values
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Transmission updated successfully',
          color: 'green',
        });
      } else {
        await addTransmission(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Transmission added successfully',
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
