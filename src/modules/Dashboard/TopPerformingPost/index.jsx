import React from 'react';
import { Box } from '@mantine/core';
import styles from './TopPerformingPost.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/DataTable';
import { columns, followersData } from './data';

export default function TopPerformingPost() {

  return (
    <section className={styles.section}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Top Performing Post</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={followersData || []}
          enablePagination={false}
        />
      </Box>
    </section>
  )
}
