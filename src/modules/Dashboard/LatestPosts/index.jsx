import React from 'react';
import { Box } from '@mantine/core';
import styles from './LatestPosts.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/DataTable';
import { columns } from './data';
import {
  useGetLatestPostsQuery,
} from '@/services/dashboard';

export default function LatestPosts() {

  const { data, isLoading } = useGetLatestPostsQuery();

  return (
    <section className={styles.section}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Latest Posts</Box>
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
