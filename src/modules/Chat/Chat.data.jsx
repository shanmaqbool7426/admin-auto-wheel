import Image from 'next/image';
import dayjs from 'dayjs';
import { ActionIcon, Group, Box } from '@mantine/core';
import { Avatar } from '@/assets/images';
import { IconDuplicate, IconTrash, IconPencil, IconExternalLink } from '@/assets/icons';
import styles from './Chat.module.css';

export const getColumns = (onClickExternalLink) => [
  {
    accessor: 'author',
    title: 'Author',
    render: ({ author }) => {
      return (
        <Box className={styles.author}>
          <Box className={styles.authorAttachment}>
            <Image src={author?.avatar} alt="car" width={44} height={36} />
          </Box>
          <Box className={styles.authorInfo}>
            <Box className={styles.authorName}>{author?.name}</Box>
            <Box className={styles.authorEmail}>{author?.email}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'role',
    title: 'Role',
  },
  {
    accessor: 'lastLogin',
    title: 'Last Login',
  },
  {
    accessor: 'joinDate',
    title: 'Join Date',
    render: ({ joinDate }) => {
      return (
        <>
          <Box className={styles.createdDate}>
            {dayjs(joinDate).format('DD--MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(joinDate).format('hh:mm A')}
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
            onClick={(e) => onClickExternalLink(e, _id)}
          >
            <IconExternalLink />
          </ActionIcon>
        </Group>
      )
    },
  },
]

export const chatData = [
  {
    _id: "111",
    author: { name: "Leslie Alexander", avatar: Avatar, email: "abc@gmail.com" },
    role: "Administrator",
    lastLogin: "Yesterday",
    joinDate: new Date(),
  },
  {
    _id: "111qw4",
    author: { name: "Cody Fisher", avatar: Avatar, email: "abc@gmail.com" },
    role: "Subscriber",
    lastLogin: "2 minutes ago",
    joinDate: new Date(),
  },
]