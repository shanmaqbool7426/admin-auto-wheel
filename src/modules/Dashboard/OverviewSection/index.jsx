import React from 'react'
import Card from '@/components/Card'
import { Box, Grid } from '@mantine/core'
import styles from './OverviewSection.module.css'
import FormField from '@/components/FormField'
import useOverviewSection from './useOverviewSection'
import { IconCalendarBlue, IconIncrement, IconDecrement } from '@/assets/icons'

export default function OverviewSection() {
  const {
    daysValue,
    handleChangeDays
  } = useOverviewSection()

  return (
    <section>
      <Box className={styles.sectionHeader}>
        <Box className={styles.sectionTitle}>Overview</Box>
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

      <Grid>
        <Grid.Col span={3}>
          <Card noContentPadding>
            <Box className={styles.cardInner}>
              <Box className={styles.cardTitle}>{'Visitors'}</Box>
              <Box className={styles.cardValue}>{'130'}</Box>
              <Box className={styles.cardFooter}>
                <Box className={styles.footerDay}>Today</Box>
                <Box className={styles.footerAction}>
                  <Box className={styles.footerIcon}>
                    <IconDecrement />
                  </Box>
                  <Box className={styles.footerActionText}>
                    <span style={{ color: '#A0251B' }}>-12%</span> vs last Day
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card noContentPadding>
            <Box className={styles.cardInner}>
              <Box className={styles.cardTitle}>{'Page Views'}</Box>
              <Box className={styles.cardValue}>{'130'}</Box>
              <Box className={styles.cardFooter}>
                <Box className={styles.footerDay}>Today</Box>
                <Box className={styles.footerAction}>
                  <Box className={styles.footerIcon}>
                    <IconIncrement />
                  </Box>
                  <Box className={styles.footerActionText}>
                    <span style={{ color: '#1BC744' }}>+12%</span> vs last Day
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card noContentPadding>
            <Box className={styles.cardInner}>
              <Box className={styles.cardTitle}>{'Users'}</Box>
              <Box className={styles.cardValue}>{'130'}</Box>
              <Box className={styles.cardFooter}>
                <Box className={styles.footerDay}>Today</Box>
                <Box className={styles.footerAction}>
                  <Box className={styles.footerIcon}>
                    <IconDecrement />
                  </Box>
                  <Box className={styles.footerActionText}>
                    <span style={{ color: '#A0251B' }}>-12%</span> vs last Day
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card noContentPadding>
            <Box className={styles.cardInner}>
              <Box className={styles.cardTitle}>{'Active Ads'}</Box>
              <Box className={styles.cardValue}>{'130'}</Box>
              <Box className={styles.cardFooter}>
                <Box className={styles.footerDay}>Today</Box>
                <Box className={styles.footerAction}>
                  <Box className={styles.footerIcon}>
                    <IconIncrement />
                  </Box>
                  <Box className={styles.footerActionText}>
                    <span style={{ color: '#1BC744' }}>+12%</span> vs last Day
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </section>
  )
}
