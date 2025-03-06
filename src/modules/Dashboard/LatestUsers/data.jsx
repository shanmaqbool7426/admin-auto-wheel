import dayjs from 'dayjs';
import { Box } from '@mantine/core';
import Image from 'next/image';
import styles from './LatestUsers.module.css';

export const columns = [
  {
    accessor: 'fullName',
    title: 'User',
    render: ({ fullName, accountType, profileImage
    }) => {
      return (
        <Box className={styles.tableTitle}>
          {profileImage && (
            <Box className={styles.tableTitleImage}>
              <Image src={profileImage} alt="car" width={44} height={36} />
            </Box>
          )}

          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{fullName}</Box>
            <Box className={styles.tableTitleModal}>{accountType}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'createdAt',
    title: 'Created',
    render: ({ createdAt }) => {
      return (
        <>
          <Box className={styles.createdDate}>
            {dayjs(createdAt).format('DD--MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(createdAt).format('hh:mm A')}
          </Box>
        </>
      )
    },
  },
  {
    accessor: 'email',
    title: 'Email',
  },
  {
    accessor: 'followers',
    title: 'Followers',
    textAlign: 'center',
    render: ({ followers }) => followers?.length,
  },
  {
    accessor: 'location',
    title: 'Location',
  },
  {
    accessor: 'activeAds',
    title: 'Active Ads',
    textAlign: 'center',
  },
  {
    accessor: 'pendingAds',
    title: 'Pending Ads',
    textAlign: 'center',
  },
]
