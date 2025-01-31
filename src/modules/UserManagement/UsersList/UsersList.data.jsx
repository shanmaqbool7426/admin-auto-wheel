import Image from 'next/image';
import { ActionIcon, Group, Box } from '@mantine/core';
import { Avatar } from '@/assets/images';
import { IconEye, IconPencil, IconRestrictionShield } from '@/assets/icons';
import styles from './UsersList.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const MODAL_TYPE = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
}

export const getColumns = (onClickEdit, onClickView, onClickShield) => [
  {
    accessor: '_id',
    title: 'User',
    render: ({ firstName, lastName, email }) => {
      return (
        <Box className={styles.author}>
          <Box className={styles.authorAttachment}>
            <Image src={Avatar} alt={`${firstName} ${lastName}`} width={44} height={36} />
          </Box>
          <Box className={styles.authorInfo}>
            <Box className={styles.authorName}>{firstName} {lastName}</Box>
            <Box className={styles.authorEmail}>{email}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'roles',
    title: 'Role',
    render: ({ roles }) => roles ? roles[0]?.name : '',
  },
  {
    accessor: 'lastLogin',
    title: 'Last login',
    render: ({ lastLogin }) => dayjs(lastLogin).fromNow(),
  },
  {
    accessor: 'createdAt',
    title: 'Join Date',
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
    render: (data) => {
      return (
        <Group justify='center' wrap='nowrap'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickEdit(e,MODAL_TYPE.EDIT, data)}
          >
            <IconPencil />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickView(MODAL_TYPE.VIEW, data)}
          >
            <IconEye />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickShield(e, data.id)}
          >
            <IconRestrictionShield />
          </ActionIcon>
        </Group>
      )
    },
  },
]

