import React from 'react'
import CustomModal from '@/components/CustomModal'
import { Grid, Box } from '@mantine/core'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { MODAL_TYPE } from '../UsersList.data'

export default function AddUser({ type, open, onClose, form, handleSubmit, isLoading }) {

  return (
    <CustomModal
      title={type === MODAL_TYPE.ADD ? "Add User" : type === MODAL_TYPE.EDIT ? "Edit User" : "View User"}
      open={open}
      onClose={onClose}
      size='1144'
    >
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="30px">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="First Name"
              type="text"
              placeholder="First Name"
              {...form.getInputProps('firstName')}
              required
              disabled={type === MODAL_TYPE.VIEW}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="Last Name"
              type="text"
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
              required
              disabled={type === MODAL_TYPE.VIEW}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="email"
              type="text"
              placeholder="abc@example.com"
              {...form.getInputProps('email')}
              required
              disabled={type === MODAL_TYPE.VIEW}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <FormField
              label="Role"
              placeholder="Select Role"
              type="select"
              data={[
                { value: 'developer', label: 'Developer' },
                { value: 'editor', label: 'Editor' },
                { value: 'administrator', label: 'Administrator' },
              ]}
              {...form.getInputProps('role')}
              required
              disabled={type === MODAL_TYPE.VIEW}
            />
          </Grid.Col>
          {type !== MODAL_TYPE.VIEW && (
            <Grid.Col span={12}>
              <Box style={{ maxWidth: '530px', margin: '0 auto' }}>
                <CustomButton color='#1B84FF' fullWidth type='submit' loading={isLoading}>
                  {MODAL_TYPE.ADD ? 'Add User' : 'Update User'}
                </CustomButton>
              </Box>
            </Grid.Col>
          )}
        </Grid>
      </form>
    </CustomModal>
  )
}
