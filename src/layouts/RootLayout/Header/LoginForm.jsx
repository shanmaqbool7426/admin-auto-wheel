// for login model
import { useLoginMutation } from '@/services/user-management';
import { useState } from 'react';
import CustomLoginModal from '@/components/LoginModel';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

export default function LoginForm({ isLoginModalOpen, setIsLoginModalOpen }) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    }
    
  });


  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleSubmit = (values) => {
    login(values).unwrap().then((res) => {
      window.location.href = '/';
      localStorage.setItem('token', res?.data?.token);
      setCookie('token', res?.data?.token);
      setCookie('user', JSON.stringify(res?.data?.user));
      localStorage.setItem('user', JSON.stringify(res?.data?.user));
      setIsLoginModalOpen(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <CustomLoginModal title="Login" open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <form onSubmit={form.onSubmit(handleSubmit)}>

       <FormField label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <FormField label="Password" type="password" placeholder="Password" {...form.getInputProps('password')} />
        <CustomButton
                type="submit"

                loading={isLoginLoading}
                disabled={isLoginLoading}
              >
                Login


              </CustomButton>
      </form>
    </CustomLoginModal>
  );
}


