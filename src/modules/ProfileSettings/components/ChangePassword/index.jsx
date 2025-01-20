'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/Card';
import FormField from '@/components/FormField';
import useChangePassword from './useChangePassword';
import CustomButton from '@/components/CustomButton';
// import buttonStyles from '@/styles/user-dashboard/button.module.css';
import styles from './ChangePassword.module.css';

export default function ChangePassword({userId}) {

  const {
    form,
    handleSubmit
  } = useChangePassword();

  return (
    <Card title="Change Password">
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values,userId))
        }
      >
        <Grid gutter="20px">
          <Grid.Col span={12}>
            <FormField
              label="Current Password"
              type="password"
              {...form.getInputProps('currentPassword')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="New Password"
              type="password"
              {...form.getInputProps('newPassword')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="New Password"
              type="password"
              {...form.getInputProps('confirmPassword')}
            />
          </Grid.Col>
        </Grid>

        <Box className={styles.buttonHolder}>
          <CustomButton
            color='#1B84FF'
            fullWidth
            type="submit"
          >
            Save
          </CustomButton>
        </Box>
      </form>
    </Card>
  )
}
