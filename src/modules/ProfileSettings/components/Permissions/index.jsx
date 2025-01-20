'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/Card';
import usePermissions from './usePermissions';
import styles from './Permissions.module.css';
import { modulesData } from './data'

export default function Permissions() {

  const {
    form,
    handleSubmit
  } = usePermissions();

  return (
    <Card title="Permissions" noContentPadding>
      {modulesData.map((module) => (
        <Box className={styles.module} key={module._id}>
          <Box className={styles.moduleHead}>
            <Box>{module.module}</Box>
            <Box>Access</Box>
          </Box>
          {module?.components.map((item) => (
            <Box className={styles.moduleRow} key={item._id}>
              <Box className={styles.moduleCell}>
                {item.name}
              </Box>
              <Box className={styles.moduleCell}>
                {item.access}
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Card>
  )
}
