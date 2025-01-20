import React from 'react'
import Card from '@/components/Card'
import { Box, Grid } from '@mantine/core'
import styles from './TotalUsers.module.css'
import FormField from '@/components/FormField'
import useTotalUsers from './useTotalUsers'
import dynamic from 'next/dynamic';
import { IconCalendarBlue, IconIncrement, IconDecrement } from '@/assets/icons';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TotalUsers() {
  const {
    daysValue,
    handleChangeDays,
    state,
  } = useTotalUsers();

  return (
    <section className={styles.sectionTotalUsers}>
      <Box className={styles.sectionHeader}>
        <Box className={styles.sectionTitle}>Total User</Box>
        <Box className={styles.sectionAction}>
          <Box className={styles.sectionActionIcon}>
            <IconCalendarBlue />
          </Box>
          <Box className={styles.actionField}>
            <FormField
              type="select"
              name="filterBy"
              data={[
                { value: 'today', label: 'Today' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: 'days-7', label: '7 Days' },
                { value: 'days-14', label: '14 Days' },
                { value: 'days-28', label: '28 Days' },
              ]}
              placeholder="Today"
              checkIconPosition="right"
              value={daysValue.value}
              onChange={handleChangeDays}
            />
          </Box>
        </Box>
      </Box>

      <Card>
        <Chart
          options={state?.options}
          series={state?.series}
          type="area"
          height={350}
        />
      </Card>
    </section>
  )
}

