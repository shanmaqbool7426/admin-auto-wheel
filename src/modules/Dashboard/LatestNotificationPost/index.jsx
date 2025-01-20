import React from 'react';
import { Box, Timeline, Text } from '@mantine/core';
import styles from './LatestNotificationPost.module.css';
import ViewallButton from '../ViewallButton';
import { timeLineData } from './data';

const Bullet = ({ color }) => (
  <Box
    style={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: color,
    }}
  />
);

export default function LatestNotificationPost() {
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Latest Notification Post</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>

      <Box className={styles.cardContent}>
        <Timeline bulletSize={24} lineWidth={2} color='#CCCCCC'>
          {timeLineData.map((item) => (
            <Timeline.Item
              key={item.id}
              bullet={<Bullet color={item.color} />}
            >
              <Box className={styles.timelineText}>
                {item.text} <Box component='span'>{item.time}</Box>
              </Box>
            </Timeline.Item>
          ))}
        </Timeline>
      </Box>
    </Box>
  )
}
