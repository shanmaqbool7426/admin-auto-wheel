
import React, { Suspense } from 'react';
import styles from './UserRoles.module.css';
import { Box, Title, Grid } from '@mantine/core';

import useUserRoles from './useUserRoles';
import UpdateRole from './UpdateRole';
import Card from '@/components/Card';
import RoleCard from './RoleCard';
import { rolesData } from './UserRoles.data';

export default function UserRoles() {
  const {
    isOpenModal,
    setIsOpenModal,
  } = useUserRoles();


  return (
    <>
      <Card>
        <Box className={styles.pageHeader}>
          <Title order={2} className={styles.pageTitle}>User Role</Title>
        </Box>
        <Box className={styles.roleCards}>
          <Grid gutter="20">
            {rolesData.map((role) => (
              <Grid.Col span={4} key={role.id}>
                <RoleCard
                  data={role}
                  handlerEditRole={() => setIsOpenModal(true)}
                />
              </Grid.Col>
            ))}

          </Grid>
        </Box>
      </Card>

      <UpdateRole
        open={isOpenModal}
        setOnClose={setIsOpenModal}
      />
      </>
  )
}
