import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {  useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/services/user-management';
import { setCookie } from '@/utils/cookies';

export default function usePersonalInformation(profileData) {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  
  const { data: profileDatas, isLoading } = useGetUserProfileQuery();
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


  console.log(">>>>>profileData......",profileData)
  useEffect(() => {
    if (profileData) {
      form.setValues({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phone || '',
        email: profileData.email || '',
        whatsAppOnThisNumber: profileData.hasWhatsApp,
        showEmail: profileData.showEmail,
      });
    }
  }, [profileData]);

  const handleSubmit = async (values) => {
    try {
      const res = await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        hasWhatsApp: values.whatsAppOnThisNumber,
        showEmail: values.showEmail,
      }).unwrap();
      console.log("res",res)
      if(res?.statusCode === 200){
// window reload
        window.location.reload();

        setCookie('user', JSON.stringify(res?.data));
        notifications.show({
          title: 'Success',
          message: 'Profile updated successfully',
          color: 'green',
        });
      }
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