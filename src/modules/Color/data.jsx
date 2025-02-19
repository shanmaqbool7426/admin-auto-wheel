import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash } from '@/assets/icons';
import styles from './Color.module.css';

export const getColumns = ({ handleOpenModalDelete, handleEditColor }) => [
  {
    accessor: 'title',
    title: 'Title',
  },
  {
    accessor: 'code',
    title: 'Color',
    render: (data) => (
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: data.code,
          border: '1px solid #ddd'
        }}
      />
    ),
  },
  {
    accessor: 'slug',
    title: 'Slug',
  },
  {
    accessor: 'type',
    title: 'Type',
  },
  {
    accessor: 'order',
    title: 'Display Order',
    textAlign: 'center',
  },
  {
    accessor: '_id',
    title: 'Actions',
    textAlign: 'center',
    render: (data) => (
      <Group justify='center' wrap='nowrap'>
        <ActionIcon
          size={20}
          className={styles.actionButton}
          onClick={() => handleEditColor(data)}
        >
          <IconPencil />
        </ActionIcon>
        <ActionIcon
          size={20}
          className={styles.actionButton}
          onClick={() => handleOpenModalDelete(data._id)}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
    ),
  },
];
