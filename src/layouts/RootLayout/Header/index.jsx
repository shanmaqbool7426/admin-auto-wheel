import React, { useState, Suspense } from 'react';
import { Box, Group, ActionIcon, UnstyledButton, Avatar, Menu } from '@mantine/core';
import styles from './Header.module.css';
import { IconCog, IconNotification } from './icons';
import useHeader from './useHeader';
import LoginForm from './LoginForm';
import { Button } from '@mantine/core';
import { getCookie, removeCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

export default function Header() {
  const token = getCookie('token') || null;
  const user = getCookie('user') || null;
  const router = useRouter();
  const handleLogout = () => {
    removeCookie('token');
    removeCookie('user');
    // Reload
    // window.location.reload();
   window.location.href = '/login';
  }


  const { isNotification, title } = useHeader();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  
  console.log(">>>>>>>>>>>>...token", token);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box className={styles.header}>
       {title && <Box className={styles.headerLeft}>
          <Box className={styles.pageTitle}>{title}</Box>
        </Box>}

        <Box className={styles.headerRight}>
          <Group justify='end' gap={20}>
            <ActionIcon variant="transparent">
              <IconCog />
            </ActionIcon>

            <ActionIcon variant="transparent">
              <IconNotification alert={isNotification ? '#E90808' : 'transparent'} />
            </ActionIcon>

            {token && Object.keys(token).length > 0 ? <Menu shadow="md" width={160} position="bottom-end">
              <Menu.Target>
                <UnstyledButton >
                  <Group gap={8}>
                    <Avatar
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                      radius="xl"
                      size={45}
                      variant='outline'
                      color='#E90808'
                    />
                    <div style={{ flex: 1 }}>
                      <Box className={styles.userName}>
                        {user?.firstName} {user?.lastName}
                      </Box>
                      <Box className={styles.userEmail}>
                        {user?.email}
                      </Box>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>Change Password</Menu.Item>
                <Menu.Item>Profile Settings</Menu.Item>
                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu> : <> 
              
              </>
            }
          </Group>
        </Box>
      </Box>
      {/* <LoginForm isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} /> */}
    </Suspense>
  );
}
