'use client';
import React from 'react';
import { useForm } from '@mantine/form';

export default function useAddUser() {

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

  const handleSubmit = (values) => {
    console.log('Form Data:: ', values);
  };

  return {
    form,
    handleSubmit,
  };
}
