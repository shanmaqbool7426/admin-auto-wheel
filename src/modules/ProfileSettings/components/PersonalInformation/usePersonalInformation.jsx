import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {  useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/services/user-management';

export default function usePersonalInformation() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  
  const { data: profileData, isLoading } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      whatsAppOnThisNumber: true,
      showEmail: true,
    },
    validate: {
      // phoneNumber: (value) => phoneRegex.test(value) ? null : 'Invalid phone number.',
      email: (value) => emailRegex.test(value) ? null : 'Invalid email address',
    },
  });

  useEffect(() => {
    if (profileData) {
      form.setValues({
        firstName: profileData.data.firstName || '',
        lastName: profileData.data.lastName || '',
        phoneNumber: profileData.data.phone || '',
        email: profileData.data.email || '',
        whatsAppOnThisNumber: profileData.data.hasWhatsApp,
        showEmail: profileData.data.showEmail,
      });
    }
  }, [profileData]);

  const handleSubmit = async (values) => {
    try {
      await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        hasWhatsApp: values.whatsAppOnThisNumber,
        showEmail: values.showEmail,
      }).unwrap();
      
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.data?.message || 'Failed to update profile',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    isUpdating
  };
}