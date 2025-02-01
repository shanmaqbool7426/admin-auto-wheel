import { useGetUserProfileQuery, useUpdateProfileImagesMutation } from '@/services/user-management';
import { notifications } from '@mantine/notifications';

export default function useProfileInformation() {
  const { data: profile, isLoading } = useGetUserProfileQuery();
  const [updateImages, { isLoading: isUpdating }] = useUpdateProfileImagesMutation();

  const handleImageUpdate = async (type, imageFile) => {
    try {
      const formData = new FormData();
      formData.append(type === 'profile' ? 'profileImage' : 'bannerImage', imageFile);

     const res = await updateImages(formData).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Image updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.data?.message || 'Failed to update image',
        color: 'red',
      });
    }
  };


  return {
    profile,
    isLoading,
    isUpdating,
    handleImageUpdate
  };
}