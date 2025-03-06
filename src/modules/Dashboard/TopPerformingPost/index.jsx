import React from 'react';
import { Box } from '@mantine/core';
import styles from './TopPerformingPost.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/DataTable';
import { columns } from './data';
import {
  useGetTopPerformingPostsQuery,
} from '@/services/dashboard';

export default function TopPerformingPost() {

  const { data, isLoading } = useGetTopPerformingPostsQuery();

  return (
    <section className={styles.section}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Top Performing Post</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={data?.data || []}
          enablePagination={false}
          fetching={isLoading}
        />
      </Box>
    </section>
  )
}
