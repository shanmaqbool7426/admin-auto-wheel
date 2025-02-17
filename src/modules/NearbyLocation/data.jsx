import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash, IconEye } from '@/assets/icons';
import styles from './NearbyLocation.module.css';

export const getColumns = ({ handleOpenModalDelete, handleEditLocation }) => [
  {
    accessor: 'title',
    title: 'Title',
  },
  {
    accessor: 'description',
    title: 'Description',
  },
  {
    accessor: 'image',
    title: 'Location Image',
    render: (data) => (
      <img 
        src={data.image} 
        alt={data.title} 
        style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
      />
    )
  },
  {
    accessor: 'slug',
    title: 'Slug',
  },
  {
    accessor: 'order',
    title: 'Display Order',
    textAlign: 'center',
  },
  {
    accessor: 'status',
    title: 'Status',
    render: (data) => (
      <span className={data.status ? styles.active : styles.inactive}>
        {data.status ? 'Active' : 'Inactive'}
      </span>
    )
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
          onClick={() => handleEditLocation(data)}
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
        <ActionIcon
          size={20}
          className={styles.actionButton}
          onClick={() => window.open(data.image, '_blank')}
        >
          <IconEye />
        </ActionIcon>
      </Group>
    ),
  }
];