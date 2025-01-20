import React from 'react';
import { Box, Title } from '@mantine/core';
import styles from './RoleCard.module.css';
import CustomButton from '@/components/CustomButton';

export default function RoleCard({ data, handlerEditRole, handlerViewRole }) {
  return (
    <Box className={styles.card}>
      <Title order={3} className={styles.cardTitle}>{data?.role}</Title>
      <Box className={styles.totalUsers}>
        Total users with this role: {data?.roleUsers}
      </Box>

      <ul className={styles.permissionsList}>
        {data?.permissions.map((permission, index) => (
          <li key={index} className={styles.permissionItem}>{permission}</li>
        ))}
      </ul>

      <Box className={styles.cardFooter}>
        <CustomButton
          variant="outline"
          color='#1B84FF'
          onClick={handlerViewRole}
        >
          View Role
        </CustomButton>
        <CustomButton
          color='#1B84FF'
          onClick={() => { console.log('llllll'); handlerEditRole() }}
        >
          Edit Role
        </CustomButton>
      </Box>
    </Box>
  )
}
