'use client';
import React from 'react';
import { Box, Grid } from '@mantine/core';
import OverviewSection from './OverviewSection';
import TotalUsers from './TotalUsers';
import LocationBaseUser from './LocationBaseUser';
import TopPerformingPost from './TopPerformingPost';
import UserReviews from './UserReviews';
import LatestNotificationPost from './LatestNotificationPost';
import LatestPosts from './LatestPosts';
import LatestUsers from './LatestUsers';

export default function Dashboard() {
  return (
    <Box>
      <OverviewSection />

      <TotalUsers />

      <LocationBaseUser />

      <TopPerformingPost />

      <LatestPosts />

      <LatestUsers />

      <section style={{ paddingTop: '24px' }}>
        <Grid>
          <Grid.Col span={6}>
            <UserReviews />
          </Grid.Col>
          <Grid.Col span={6}>
            <LatestNotificationPost />
          </Grid.Col>
        </Grid>
      </section>
    </Box>
  )
}
