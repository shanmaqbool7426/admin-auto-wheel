import React from 'react';
import { Box, SemiCircleProgress } from '@mantine/core';
import styles from './SidebarCard.module.css';
import useSidebarCard from './useSidebarCard';
import { IconTypeDocument, IconTypeFolder, IconTypeImage, IconTypeMusic, IconTypeVideo } from '@/assets/icons';

export default function SidebarCard() {
  const { value } = useSidebarCard();
  return (
    <Box className={styles.sidebarCard}>
      <Box className={styles.sidebarHeading}>Storage</Box>
      <Box className={styles.progressbar}>
        <SemiCircleProgress
          value={value}
          transitionDuration={250}
          label={`${value}%`}
          filledSegmentColor="#1B84FF"
          size={110}
          thickness={10}
        />
      </Box>
      <Box className={styles.progressbarText}>
        48.02 GB (76%) of 64 GB used
      </Box>

      <ul className={styles.fileDetails}>
        <li>
          <Box className={styles.fileDetailsLeft}>
            <Box className={styles.fileIcon}>
              <IconTypeImage />
            </Box>
            <Box className={styles.fileName}>
              <Box className={styles.fileType}>Images</Box>
              <Box className={styles.fileNumbers}>176 Files</Box>
            </Box>
          </Box>
          <Box className={styles.fileSize}>6 GB</Box>
        </li>

        <li>
          <Box className={styles.fileDetailsLeft}>
            <Box className={styles.fileIcon}>
              <IconTypeVideo />
            </Box>
            <Box className={styles.fileName}>
              <Box className={styles.fileType}>Video</Box>
              <Box className={styles.fileNumbers}>176 Files</Box>
            </Box>
          </Box>
          <Box className={styles.fileSize}>6 GB</Box>
        </li>

        <li>
          <Box className={styles.fileDetailsLeft}>
            <Box className={styles.fileIcon}>
              <IconTypeMusic />
            </Box>
            <Box className={styles.fileName}>
              <Box className={styles.fileType}>Music</Box>
              <Box className={styles.fileNumbers}>176 Files</Box>
            </Box>
          </Box>
          <Box className={styles.fileSize}>6 GB</Box>
        </li>

        <li>
          <Box className={styles.fileDetailsLeft}>
            <Box className={styles.fileIcon}>
              <IconTypeDocument />
            </Box>
            <Box className={styles.fileName}>
              <Box className={styles.fileType}>Documents</Box>
              <Box className={styles.fileNumbers}>176 Files</Box>
            </Box>
          </Box>
          <Box className={styles.fileSize}>6 GB</Box>
        </li>

        <li>
          <Box className={styles.fileDetailsLeft}>
            <Box className={styles.fileIcon}>
              <IconTypeFolder />
            </Box>
            <Box className={styles.fileName}>
              <Box className={styles.fileType}>Others</Box>
              <Box className={styles.fileNumbers}>176 Files</Box>
            </Box>
          </Box>
          <Box className={styles.fileSize}>6 GB</Box>
        </li>
      </ul>
    </Box>
  )
}
