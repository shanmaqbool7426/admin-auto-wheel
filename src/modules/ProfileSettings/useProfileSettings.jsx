import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { 
  useGetUserProfileQuery, 
  useUpdateUserProfileMutation 
} from '@/services/user-management';
import { getSafeUserFromCookie } from '@/utils/cookies';
import { useGetRolesQuery } from '@/services/roles';

export default function useProfileSettings() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Get user profile 
  const user = getSafeUserFromCookie(); 
  const userId = user?._id;

  console.log("userId",userId)

  const { data: profileData, isLoading: isProfileLoading } = useGetUserProfileQuery(userId &&userId );
  // get roles
  const { data: roles } = useGetRolesQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  //  get use  from cookie
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

  console.log(">>>>>>user",user)
console.log("user>>>>",roles?.data?.roles.find(role => role?.name?.toLowerCase() === user.roles.toLowerCase()))

  // Update form when profile data is loaded
  useEffect(() => {
    if (user) {
      personalInfoForm.setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phone || '',
        email: user.email || '',
        whatsAppOnThisNumber: user.hasWhatsApp || false,
        showEmail: user.showEmail || false,
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
    roles:roles?.data?.roles?.find(role => role?.name?.toLowerCase() === user?.roles?.toLowerCase()),
    profileData
  };
}