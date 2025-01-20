import Image from 'next/image';
import dayjs from 'dayjs';
import { ActionIcon, Group, Box } from '@mantine/core';
import { Avatar } from '@/assets/images';
import { IconDuplicate, IconTrash, IconPencil } from '@/assets/icons';
import styles from './Comments.module.css';

export const getColumns = (onClickDelete) => [
  {
    accessor: 'name',
    title: 'Author',
    render: ({ name, email, avatar }) => {
      return (
        <Box className={styles.author}>
          <Box className={styles.authorAttachment}>
            <Image src={Avatar} alt="car" width={44} height={36} />
          </Box>
          <Box className={styles.authorInfo}>
            <Box className={styles.authorName}>{name}</Box>
            <Box className={styles.authorEmail}>{email}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'content',
    title: 'Comment',
  },
  {
    accessor: 'replyMessage',
    title: 'In Response to',
  },
  {
    accessor: 'createdAt',
    title: 'Submitted on',
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
    accessor: '_id',
    title: 'Actions',
    textAlign: 'center',
    render: ({ _id }) => {
      return (
        <Group justify='center' wrap='nowrap'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickDelete(_id)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      )
    },
  },
]
