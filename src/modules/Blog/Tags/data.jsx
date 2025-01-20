import styles from './Tags.module.css';
import { ActionIcon, Group } from '@mantine/core';
import { IconEye, IconTrash, IconPencil } from '@/assets/icons';

export const getColumns = (onClickEdit, onClickDelete, onClickDuplicate) => [
  {
    accessor: 'name',
    title: 'Name',
  },
  {
    accessor: 'description',
    title: 'Description',
  },
  {
    accessor: 'slug',
    title: 'Slug',
  },
  {
    accessor: '__v',
    title: 'Count',
    textAlign: 'center',
  },
  {
    accessor: '_id',
    title: 'Actions',
    textAlign: 'center',
    render: ({ _id, slug }) => {
      return (
        <Group justify='center' wrap='nowrap'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickEdit(e, _id)}
          >
            <IconPencil />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickDelete(_id)}
          >
            <IconTrash />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => window.location.href = `https://new-auto-wheel.netlify.app/blog/tag/${slug}`}
          >
            <IconEye />
          </ActionIcon>
        </Group>
      )
    },
  },
]
