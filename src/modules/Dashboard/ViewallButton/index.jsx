import React from 'react';
import { IconArrowRightRed } from '@/assets/icons';
import { Box } from '@mantine/core';
import styles from './ViewallButton.module.css';

export default function ViewallButton({ onClick }) {
  return (
    <Box onClick={onClick} className={styles.viewallButton}>
      View All
      <IconArrowRightRed />
    </Box>
  )
}
