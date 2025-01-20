'use client';
import React from 'react';
import { ScrollArea, Box, Group, Avatar } from '@mantine/core';
import styles from './ChatSidebar.module.css';
import useChatSidebar from './useChatSidebar';
import Search from '@/components/Search';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ChatSidebar() {
  const {
    setSearchBy,
    conversationsList,
    selectedConversationId,
    handleSelectConversation,
    isLoading
  } = useChatSidebar();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.searchbar}>
        <Search setSearchBy={setSearchBy} />
      </Box>
      <Box className={styles.sidebarContent}>
        <ScrollArea h="100%">
          <ul className={styles.sidebarList}>
            {conversationsList?.data?.map((conversation) => {
              const isSelected = selectedConversationId === conversation._id;
              return (
                <li 
                  className={`${styles.sidebarListItem} ${isSelected ? styles.selected : ''}`} 
                  key={conversation._id}
                  onClick={() => handleSelectConversation(conversation._id)}
                >
                  <Group gap={16}>
                    <Avatar
                      src={null}
                      radius="xl"
                      size={48}
                      color="blue"
                    >
                      {conversation.user.fullName.charAt(0)}
                    </Avatar>

                    <div style={{ flex: 1 }}>
                      <Box className={styles.userName}>
                        {conversation.user.fullName}
                      </Box>

                      <Box className={styles.userMsg}>
                        {conversation.lastMessage?.content || 'No messages yet'}
                      </Box>
                    </div>
                  </Group>
                  {conversation.lastMessage && (
                    <Box className={styles.userTime}>
                      {dayjs(conversation.lastMessage.createdAt).fromNow()}
                    </Box>
                  )}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </Box>
    </Box>
  );
}