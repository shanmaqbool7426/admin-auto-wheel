import React from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './ChatContent.module.css';
import useChatDetails from '../../useChatDetails';
import useChatSidebar from '../ChatSidebar/useChatSidebar';
import dayjs from 'dayjs';

export default function ChatContent() {
  const {
    value,
    handleChangeSendMessage
  } = useChatDetails();
  
  const { conversations, selectedConversationId } = useChatSidebar();
  const user = "67302cefa1251b0135c86ea7"; // Current user ID

  // Get selected conversation
  const selectedConversation = conversations?.data?.find(
    conv => conv._id === selectedConversationId
  );

  const scrollAreaRef = React.useRef(null);

  // Auto scroll to bottom
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [conversations?.data]);

  // if (!selectedConversation) {
  //   return (
  //     <Box className={styles.noSelection}>
  //       Select a conversation to start chatting
  //     </Box>
  //   );
  // }

  return (
    <>
      <Box className={styles.chatHeader}>
        <Group gap={16}>
          <Avatar
            src={null}
            radius="xl"
            size={48}
            color="blue"
          >
            {selectedConversation?.user?.fullName?.charAt(0)}
          </Avatar>

          <div style={{ flex: 1 }}>
            <Box className={styles.userName}>
              {selectedConversation?.user?.fullName}
            </Box>

            <Box className={styles.userMsg}>
              {selectedConversation?.user?.email}
            </Box>
          </div>
        </Group>
      </Box>

      <Box className={styles.messageSection}>
        <ScrollArea h="100%" viewportRef={scrollAreaRef}>
          <ul className={styles.messagesList}>
            {conversations?.data?.map((conversation) => {
              const isOwnMessage = conversation.sender === user;
              return (
                <li 
                  key={conversation._id} 
                  className={`${styles.messageItem} ${isOwnMessage ? styles.itemSend : styles.itemReceived}`}
                >
                  <Box className={`${styles.message} ${isOwnMessage ? styles.msgSend : styles.msgReceived}`}>
                    {conversation?.content}
                    <span className={styles.messageTime}>
                      {/* {dayjs(conversation.lastMessage?.createdAt).format('HH:mm')} */}
                    </span>
                  </Box>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </Box>

      <Box className={styles.inputSection}>
        <Input
          placeholder="Type a message..."
          value={value}
          onChange={handleChangeSendMessage}
          rightSection={
            <ActionIcon 
              onClick={() => sendMessage(selectedConversation?.user?._id)}
              disabled={!value.trim()}
            >
              <IconSend size={16} />
            </ActionIcon>
          }
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault();
              sendMessage(selectedConversation?.user?._id);
            }
          }}
        />
      </Box>
    </>
  );
}