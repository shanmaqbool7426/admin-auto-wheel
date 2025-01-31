'use client';
import { useForm } from '@mantine/form';
import { useGetRolesQuery } from '@/services/roles';

export default function useAddUser() {
  const { data: roles, isLoading: isRolesLoading } = useGetRolesQuery();

  const form = useForm({
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

  return {
    form,
    roles,
    isRolesLoading,
  };
}