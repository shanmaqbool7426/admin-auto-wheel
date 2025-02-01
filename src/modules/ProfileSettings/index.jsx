'use client';
import React from 'react';
import { Box, Stack, LoadingOverlay } from '@mantine/core';
import useProfileSettings from './useProfileSettings';
import styles from './ProfileSettings.module.css';
import PersonalInformation from './components/PersonalInformation';
import Permissions from './components/Permissions';
import ProfileInformation from './components/ProfileInformation';
import LastLogin from './components/LastLogin';
import ChangePassword from './components/ChangePassword';
import { getSafeUserFromCookie } from '@/utils/cookies';

export default function ProfileSettings() {
  const { profileData, isProfileLoading, roles } = useProfileSettings();
  // get user from cookie
  const user = getSafeUserFromCookie();

  if (!user) {
    return <LoadingOverlay visible={isProfileLoading} />;
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <Stack gap="24px">
          <ProfileInformation 
            profileData={user}
            roles={roles}
          />
          <LastLogin 
            lastLogin={user.lastLogin}
          />
        </Stack>
      </Box>

      <Box className={styles.content}>
        <Stack gap="24px">
          <PersonalInformation 
            profileData={user}
          />
          <Permissions 
            
            permissions={roles}
          />
          <ChangePassword 
            userId={user._id}
          />
        </Stack>
      </Box>
    </Box>
  )
}