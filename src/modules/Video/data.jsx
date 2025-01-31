import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash, IconEye } from '@/assets/icons';
import styles from './Video.module.css';

export const getColumns = ({ handleOpenModalDelete, handleEditVideo }) => [
  {
    accessor: 'title',
    title: 'Title',
    width: 200,
  },
  {
    accessor: 'description',
    title: 'Description',
    width: 400,
  },
  {
    accessor: 'type',
    title: 'Type',
    width: 100,
  },
  {
    accessor: 'thumbnail',
    title: 'Thumbnail',
    render: (data) => (
      <img 
        src={data.thumbnail} 
        alt={data.title} 
        style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
      />
    )
  },
  {
    accessor: 'category',
    title: 'Category',
    width: 100,
  },
  {
    accessor: 'url',
    title: 'Video URL',
    render: (data) => (
      <a href={data.url} target='_blank' rel='noopener noreferrer'>
        View Video
      </a>
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
          onClick={() => handleEditVideo(data)}
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
          onClick={() => window.open(data.url, '_blank')}
        >
          <IconEye />
        </ActionIcon>
      </Group>
    ),
  },
];