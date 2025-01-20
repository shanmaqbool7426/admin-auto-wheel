import React from 'react'
import { LoadingOverlay, Box } from '@mantine/core';
import styles from './PageLoader.module.css';

export default function PageLoader({ height }) {
  return (
    <Box className={styles.loaderWrapper} style={{ height: height ? height : 'auto' }}>
      <LoadingOverlay
        visible={true}
        overlayProps={{
          color: "#1B84FF",
          backgroundOpacity: 0.045,
          blur: 4,
        }}
        loaderProps={{ color: '#1B84FF', type: 'bars' }}
      />
    </Box >
  )
}
