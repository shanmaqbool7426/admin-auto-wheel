import React from 'react';
import { useForm } from '@mantine/form';

export default function usePermissions() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      companyName: '',
      licenseNumber: '',
      location: '',
      salesHours: '',
      whatsAppOnThisNumber: true,
      showEmail: true,
    },
  });

  const handleSubmit = (values) => {
  };

  return {
    form,
    handleSubmit
  };
}
