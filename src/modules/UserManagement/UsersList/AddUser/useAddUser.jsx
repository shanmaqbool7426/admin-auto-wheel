'use client';
import React from 'react';
import { useForm } from '@mantine/form';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import { useCreateUserMutation } from '@/services/user-management';

export default function useAddUser(setOnClose) {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (values) => {

    try {
      await createUser(values)?.unwrap();
      setOnClose(false);
      form.reset();
      successSnackbar('User added successfully');
    } catch (error) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
  };
}
