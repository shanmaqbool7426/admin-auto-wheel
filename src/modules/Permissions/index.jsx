'use client';
import React from 'react';
import { Grid, Button, Box, Checkbox } from '@mantine/core';
import Card from '@/components/Card';
import usePermissions from './usePermissions';
import styles from './Permissions.module.css';

const PERMISSION_LABELS = {
  read: 'Read',
  access: 'Access',
  edit: 'Edit',
  readOnly: 'Read Only'
};

export default function Permissions({ permissions }) {
  const { form, handleSubmit } = usePermissions();

  // Filter out administratorAccess and format modules
  const modules = Object.entries(permissions?.permissions || {})
    .filter(([key]) => key !== 'administratorAccess')
    .map(([moduleName, permissions]) => ({
      name: moduleName,
      permissions: Object.entries(permissions)
        .filter(([key]) => key !== 'selectAll')
        .map(([permission, value]) => ({
          name: PERMISSION_LABELS[permission] || permission,
          value: value
        }))
    }));

  return (
    <Card title="Permissions" noContentPadding>
      {modules.map((module) => (
        <Box className={styles.module} key={module.name}>
          <Box className={styles.moduleHead}>
            <Box>{module.name.charAt(0).toUpperCase() + module.name.slice(1)}</Box>
            <Box className={styles.permissionHeaders}>
              {['Access', 'Edit', 'Read'].map(header => (
                <Box key={header}>{header}</Box>
              ))}
            </Box>
          </Box>
          <Box className={styles.moduleRow}>
            <Box className={styles.moduleCell}>
              Module Permissions
            </Box>
            <Box className={styles.permissionCells}>
              {module.permissions.map(permission => (
                <Box key={permission.name} className={styles.permissionCell}>
                  <Checkbox
                    checked={permission.value}
                    readOnly
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
