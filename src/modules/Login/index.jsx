'use client'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { useLoginMutation } from '@/services/user-management'
import { Box, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
// for login method get  from context
import { setCookie } from '@/utils/cookies'

const LoginModule = () => {
    const form = useForm({
    initialValues: {
      email: '',
      password: '',
    }
  });


  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleSubmit = (values) => {
    console.log(values);
    loginMutation(values).unwrap().then((res) => {
      window.location.href = '/';
      localStorage.setItem('token', res?.data?.token);
      localStorage.setItem('user', JSON.stringify(res?.data?.user));
      setCookie('token', res?.data?.token);
      setCookie('user', JSON.stringify(res?.data?.user));
      setIsLoginModalOpen(false);
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <>
    {/* box 50%  width and centerd  bordered*/}
      <Box  width="50%" mx="auto" border="1px solid #ccc" p={20} mt={20}>
        <form onSubmit={form.onSubmit(handleSubmit)}>

          <FormField label="Email" placeholder="Email" {...form.getInputProps('email')} />
          <FormField label="Password" type="password" placeholder="Password" {...form.getInputProps('password')} />
          <Box mt={10}> 
          <Button
            type="submit"
            
            loading={isLoginLoading}
            disabled={isLoginLoading}
          >
            Login
          </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default LoginModule