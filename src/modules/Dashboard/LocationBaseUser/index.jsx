import React, { useState } from 'react';
import { Box } from '@mantine/core';
import useLocationBaseUsers from './useLocationBaseUsers';
import dynamic from 'next/dynamic';
import styles from './LocationBaseUser.module.css';
import Card from '@/components/Card';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LocationBaseUser() {
  const {
    series,
    options
  } = useLocationBaseUsers();

  return (
    <Box className={styles.section}>
      <Card noContentPadding>
        <Box className={styles.cardHeader}>
          <Box className={styles.cardTitle}>Location Base User</Box>
        </Box>

        <Box>
          <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </Box>
      </Card>
    </Box>
  )
}
