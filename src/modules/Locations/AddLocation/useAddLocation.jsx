'use client';
import React from 'react';
import { useForm } from '@mantine/form';
import {
  useAddLocationMutation,
} from '@/services/location';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useAddLocation(setOnClose) {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: '',
      slug: '',
      description: '',
    },
  });
  const [postAddLocation, { isLoading }] = useAddLocationMutation();

  const handleSubmit = async (values) => {
    console.log('Form Data:: ', values);

    try {
      await postAddLocation(values)?.unwrap();
      setOnClose(false);
      form.reset();
      successSnackbar('Location added successfully');
    } catch (error) {
      errorSnackbar('An error occured');
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
  };
}
