import React from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './EmailContent.module.css';


export default function EmailContent() {

  return (
    <>
      <Box className={styles.emaiHeader}>
        <Box className={styles.emailHeaderTitle}>
          Message Inbox
        </Box>
      </Box>

      <Box className={styles.messageSecction}>
        <ScrollArea h="100%">

        </ScrollArea>
      </Box>
    </>
  )
}
