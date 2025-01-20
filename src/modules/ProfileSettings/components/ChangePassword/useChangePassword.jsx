import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdatePasswordMutation } from '@/services/user-management';

export default function useChangePassword(userId) {
  const [changePassword, { isLoading }] = useUpdatePasswordMutation();

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: (value) => !value ? 'Current password is required' : null,
      newPassword: (value) => {
        if (!value) return 'New password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Please confirm your password';
        if (value !== values.newPassword) return 'Passwords do not match';
        return null;
      },
    },
  });

  const handleSubmit = async (values,userId) => {
    try {
        await changePassword({
        userId,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });
      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.data?.message || 'Failed to change password',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading
  };
}