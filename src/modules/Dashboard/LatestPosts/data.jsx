import dayjs from 'dayjs';
import { Box } from '@mantine/core';
import Image from 'next/image';
import styles from './LatestPosts.module.css';

export const columns = [
  {
    accessor: 'post',
    title: 'Post',
    render: ({ title, imageUrl, author }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={imageUrl} alt="car" width={44} height={36} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{title}</Box>
            <Box className={styles.tableTitleModal}>{author}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'createdAt',
    title: 'Created',
    render: ({ createdAt }) => (
      !createdAt ? (
        <>-</>
      ) : (
        <>
          <Box className={styles.createdDate}>
            {dayjs(createdAt).format('DD--MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(createdAt).format('hh:mm A')}
          </Box>
        </>
      )
    ),
  },
  {
    accessor: 'type',
    title: 'Type',
  },
  {
    accessor: 'user',
    title: 'User',
  },
  {
    accessor: 'viewCount',
    title: 'Views',
    textAlign: 'center',
  },
  {
    accessor: 'clicks',
    title: 'Clicks',
    textAlign: 'center',
  },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status }) => {
      return (
        <>
          <Box className={styles.statusBadge} style={{ backgroundColor: status === 'active' ? '#4CB64A' : '#F9C643' }}>
            {status === 'active' ? 'Active' : 'Pending'}
          </Box>
        </>
      )
    },
  },
]
