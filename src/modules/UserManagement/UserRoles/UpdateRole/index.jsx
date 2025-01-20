import React from 'react';
import CustomModal from '@/components/CustomModal';
import useAddUser from './useAddUser';
import { Grid, Box } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

export default function UpdateRole({ isOpen, setIsOpen }) {
  const {
    form,
    handleSubmit,
  } = useAddUser()

  return (
    <CustomModal
      title="Update Administrator Role"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      size='762'
    >
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="30px">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="First Name:"
              type="text"
              placeholder="First Name"
              {...form.getInputProps('firstName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="Last Name"
              type="text"
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="email"
              type="text"
              placeholder="abc@example.com"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="Role"
              placeholder="Select Role"
              type="select"
              data={[
                { value: 'superAdmin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'author', label: 'Author' },
                { value: 'contributor', label: 'Contributor' },
                { value: 'subscriber', label: 'Subscriber' },
              ]}
              {...form.getInputProps('parentCategory')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Box style={{ maxWidth: '530px', margin: '0 auto' }}>
              <CustomButton color='#1B84FF' fullWidth type='submit'>
                Add User
              </CustomButton>
            </Box>
          </Grid.Col>

        </Grid>
      </form>
    </CustomModal>
  )
}
