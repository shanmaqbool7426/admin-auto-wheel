'use client';
import React from 'react';
import { useForm } from '@mantine/form';
import {
  useAddLocationMutation,
  useGetLocationsQuery,
} from '@/services/location';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useAddLocation(setOnClose) {

  const form = useForm({
    initialValues: {
      name: '',
      type: '',
      slug: '',
      description: '',
      parentId: null,
      parentType: '',
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      type: (value) => (value ? null : 'Type is required'),
      slug: (value) => (value ? null : 'Slug is required'),
    },
  });

  console.log('form.values:: ', form.values);
  const [postAddLocation, { isLoading }] = useAddLocationMutation();
  const { data: locationsData } = useGetLocationsQuery({
    type: form.values.parentType,
    limit: 1000,
  });
  console.log('locationsData:: ', locationsData);


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


  console.log('form::>>>>>>> ', form.values);
  return {
    form,
    handleSubmit,
    isLoading,
    locations: locationsData?.data?.locations
  };
}
