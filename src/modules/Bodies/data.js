  import { ActionIcon, Group } from '@mantine/core';
  import { IconPencil, IconTrash, IconEye } from '@/assets/icons';
  import styles from '../Banner/AddBanner/AddBanner.module.css';

  export const getColumns = ({ handleOpenModalDelete, handleEditBody }) => [
    {
      accessor: 'title',
      title: 'Title',
    },
    {
      accessor: 'type',
      title: 'Type',
    },
    {
      accessor: 'description',
      title: 'Description',
    },
    {
      accessor: 'image',
      title: 'Body Image',
      render: (data) => (
        <img 
          src={data.bodyImage} 
          alt={data.title} 
          style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
        />
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
            onClick={() => handleEditBody(data)}
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