'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/Card';
import usePermissions from './usePermissions';
import styles from './Permissions.module.css';

export default function Permissions({permissions}) {
  const {
    form,
    handleSubmit
  } = usePermissions();

  const permissionsArray = React.useMemo(() => {
    if (!permissions?.permissions) return [];
    
    return Object.entries(permissions.permissions).map(([key, value]) => ({
      _id: key,
      module: key.charAt(0).toUpperCase() + key.slice(1),
      components: [{
        _id: `${key}-access`,
        name: 'Access',
        access: value.access ? 'Yes' : 'No'
      }]
    }));
  }, [permissions]);

  return (
    <Card title="Permissions" noContentPadding>
      {permissionsArray.map((module) => (
        <Box className={styles.module} key={module._id}>
          <Box className={styles.moduleHead}>
            <Box>{module.module}</Box>
            <Box>Access</Box>
          </Box>
          {module.components.map((item) => (
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
  );
}
