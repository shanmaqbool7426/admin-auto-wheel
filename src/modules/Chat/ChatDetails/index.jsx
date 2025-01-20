'use client';
import React from 'react';
import { Box } from '@mantine/core';
import useChatDetails from './useChatDetails';
import styles from './ChatDetails.module.css';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';

export default function ChatDetails() {

  const {

  } = useChatDetails();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <ChatSidebar />
      </Box>

      <Box className={styles.content}>
        <ChatContent />
      </Box>
    </Box>
  )
}
