'use client';
import React from 'react';
import { useForm } from '@mantine/form';

export default function useAddTag() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      slug: '',
      description: '',
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
