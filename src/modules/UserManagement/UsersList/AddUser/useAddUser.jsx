  'use client';
  import React from 'react';
  import { useForm } from '@mantine/form';
  import { useCreateUserMutation, useUpdateUserProfileMutation } from '@/services/user-management';
  import { notifications } from '@mantine/notifications';


  export default function useAddUser(setOnClose) {

    const form = useForm({
      mode: 'uncontrolled',
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

    const [createUser, { isLoading }] = useCreateUserMutation();
    const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserProfileMutation();

    const handleSubmit = async (values) => {

      try {
        // update the user 
        

        await createUser(values)?.unwrap();
        setOnClose(false);
        form.reset();
        notifications.show({
          title: 'Success',
          message: 'User added successfully',
          color: 'green',
        });

      } catch (error) {
        console.log("error",error);
        notifications.show({
          title: 'Error',
          message: "User added failed",
          color: 'red',
        });
      }
    };

    return {
      form,
      handleSubmit,
      isLoading,
    };
  }
