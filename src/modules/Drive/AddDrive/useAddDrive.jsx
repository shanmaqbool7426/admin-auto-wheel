'use client';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAddDriveMutation, useUpdateDriveMutation } from '@/services/drive';

export default function useAddDrive({ selectedDrive, onClose }) {
  const [addDrive, { isLoading: isAdding }] = useAddDriveMutation();
  const [updateDrive, { isLoading: isUpdating }] = useUpdateDriveMutation();

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
    if (selectedDrive) {
      form.setValues({
        title: selectedDrive.title || '',
        type: selectedDrive.type || '',
        order: selectedDrive.order || 0,
      });
    } else {
      form.reset();
    }
  }, [selectedDrive]);

  const handleSubmit = async (values) => {
    try {
      if (selectedDrive) {
        await updateDrive({
          id: selectedDrive._id,
          body: values
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Drive updated successfully',
          color: 'green',
        });
      } else {
        await addDrive(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Drive added successfully',
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
