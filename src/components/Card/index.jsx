import React from 'react'
import { Box, Title } from '@mantine/core'
import styles from './Card.module.css'

export default function Card({ children, title, noContentPadding }) {
  return (
    <Box className={styles.card}>
      {title && (
        <Box className={styles.cardHeader}>
          <Title className={styles.cardTitle} order={3}>{title}</Title>
        </Box>
      )}

      <Box
        className={styles.cardContent}
        style={{
          padding: noContentPadding ? '0' : '24px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
