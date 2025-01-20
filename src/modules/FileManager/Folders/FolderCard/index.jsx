import React from 'react';
import { Box } from '@mantine/core';
import styles from './FolderCard.module.css';
import { IconFolder, IconFolderAction } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { PATH_NAME } from '@/constants/pathname';

export default function FolderCard({ data }) {
  const router = useRouter();
  return (
    <Box className={styles.card} onClick={() => router.push(`${PATH_NAME.FILE_MANAGER}/${data?._id}`)}>
      <Box className={styles.cardTop}>
        <Box className={styles.cardIcon}>
          <IconFolder />
        </Box>
        <Box className={styles.cardAction}>
          <IconFolderAction />
        </Box>
      </Box>
      <Box className={styles.cardTitle}>{data.title}</Box>
      <Box className={styles.cardFooter}>
        <Box className={styles.cardFooterText}>{data.files} Files</Box>
        <Box className={styles.cardFooterText}>{data.size}</Box>
      </Box>
    </Box>
  )
}
