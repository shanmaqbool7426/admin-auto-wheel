import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { 
  useGetUserProfileQuery, 
  useUpdateUserProfileMutation 
} from '@/services/user-management';

export default function useProfileSettings() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Get user profile data
  const { data: profileData, isLoading: isProfileLoading } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const personalInfoForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      whatsAppOnThisNumber: true,
      showEmail: false,
    },
    validate: {
      phoneNumber: (value) => phoneRegex.test(value) ? null : 'Invalid phone number.',
      email: (value) => emailRegex.test(value) ? null : 'Invalid email address',
    },
  });


  console.log(profileData, 'profileData');
  // Update form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      personalInfoForm.setValues({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phone || '',
        email: profileData.email || '',
        whatsAppOnThisNumber: profileData.hasWhatsApp || false,
        showEmail: profileData.showEmail || false,
      });
    }
  }, [profileData]);

  const handleSubmitPersonalInformation = async (values) => {
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
    personalInfoForm,
    handleSubmitPersonalInformation,
    isProfileLoading,
    isUpdating,
    profileData
  };
}