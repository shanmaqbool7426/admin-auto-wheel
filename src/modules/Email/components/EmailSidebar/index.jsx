'use client';
import React from 'react';
import { ScrollArea, Box, Group, Avatar } from '@mantine/core';
import styles from './EmailSidebar.module.css';
import { emailSidebarData } from './data';

export default function EmailSidebarData() {

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.sidebarContent}>
        <ScrollArea h="100%">
          <ul className={styles.sidebarList}>
            {emailSidebarData.map((item) => {
              return (
                <li className={styles.sidebarListItem} key={item._id}>
                  <Group gap={16}>
                    <Avatar
                      src={item?.avatar}
                      radius="xl"
                      size={48}
                    />

                    <div style={{ flex: 1 }}>
                      <Box className={styles.userName}>
                        {item?.name}
                      </Box>

                      <Box className={styles.userMsg}>
                        {item?.message}
                      </Box>
                    </div>
                  </Group>
                  <Box className={styles.userTime}>{item?.time}</Box>
                </li>
              )
            })}

          </ul>
        </ScrollArea>
      </Box>

    </Box>
  )
}
