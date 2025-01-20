import React from 'react';
import { Box } from '@mantine/core';
import styles from './LatestPosts.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/DataTable';
import { columns, data } from './data';

export default function LatestPosts() {

  return (
    <section className={styles.section}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Latest Posts</Box>
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
