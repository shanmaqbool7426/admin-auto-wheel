import React from 'react';
import { Box } from '@mantine/core';
import styles from './LatestUsers.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/DataTable';
import { columns, data } from './data';

export default function LatestUsers() {

  return (
    <section className={styles.section}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Latest Users</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={data || []}
          enablePagination={false}
        />
      </Box>
    </section>
  )
}
