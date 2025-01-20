'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Title, Group, Button } from '@mantine/core';
import Card from '@/components/Card';
import useProfileInformation from './useProfileInformation';
import styles from './ProfileInformation.module.css';
import { ProfileBg, ProfileAvatar } from '@/assets/images'
import CustomButton from '@/components/CustomButton';

export default function ProfileInformation() {

  const {
    form,
    handleSubmit
  } = useProfileInformation();

  return (
    <Card noContentPadding>
      <Box className={styles.profileBanner}>
        <Image
          src={ProfileBg}
          alt="Profile"
          width={354}
          height={140}
        />

        <Box className={styles.profilePicture}>
          <Image
            src={ProfileAvatar}
            alt="Profile"
            width={144}
            height={144}
          />
        </Box>
      </Box>
      <Box className={styles.profileInfoContent}>
        <Box className={styles.userPersonalDetails}>
          <Title
            className={styles.profileInfoTitle}
            order={3}
            align="center"
          >
            Albert Kart
          </Title>
          <Box className={styles.userEmail}>abc@gmail.com</Box>
          <Box className={styles.userStatus}>Active</Box>
        </Box>
        <Box className={styles.userContactDetials}>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Phone No
            </Box>
            <Box className={styles.contactTitle}>
              +92 345 765 7645
            </Box>
          </Box>

          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Last Login
            </Box>
            <Box className={styles.contactTitle}>
              26 March 2024, 8:57 Pm
            </Box>
          </Box>

          <Box className={styles.delButton}>
            <CustomButton
              fullWidth
            >
              Delete Account
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
