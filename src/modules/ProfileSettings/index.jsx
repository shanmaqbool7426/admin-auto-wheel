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

export default function ProfileSettings() {
  const { profileData, isProfileLoading } = useProfileSettings();

  if (!profileData?.data) {
    return <LoadingOverlay visible={isProfileLoading} />;
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <Stack gap="24px">
          <ProfileInformation 
            profileData={profileData.data}
          />
          <LastLogin 
            lastLogin={profileData.data.lastLogin}
          />
        </Stack>
      </Box>

      <Box className={styles.content}>
        <Stack gap="24px">
          <PersonalInformation 
            profileData={profileData.data}
          />
          <Permissions 
            permissions={profileData.data.permissions}
          />
          <ChangePassword 
            userId={profileData.data._id}
          />
        </Stack>
      </Box>
    </Box>
  )
}