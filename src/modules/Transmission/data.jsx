import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash } from '@/assets/icons';
import styles from './Transmission.module.css';

export const getColumns = ({ handleOpenModalDelete, handleEditTransmission }) => [
  {
    accessor: 'title',
    title: 'Title',
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
          onClick={() => handleEditTransmission(data)}
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
