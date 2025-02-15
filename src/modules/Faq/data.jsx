import { ActionIcon, Group, Badge } from '@mantine/core';
import { IconPencil, IconTrash } from '@/assets/icons';
import styles from './Faq.module.css';

export const getColumns = ({ handleOpenModalDelete, handleEditFaq }) => [
  {
    accessor: 'question',
    title: 'Question',
    width: '30%',
    render: (data) => (
      <div className={styles.questionCell}>
        {data.question}
      </div>
    )
  },
  {
    accessor: 'answer',
    title: 'Answer',
    width: '40%',
    render: (data) => (
      <div className={styles.answerCell}>
        {data.answer}
      </div>
    )
  },
  {
    accessor: 'type',
    title: 'Vehicle Type',
    width: '15%',
    render: (data) => (
      <Badge
        color={data.type === 'car' ? 'blue' : data.type === 'bike' ? 'green' : 'orange'}
      >
        {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
      </Badge>
    )
  },
  {
    accessor: 'status',
    title: 'Status',
    render: (data) => (
      <Badge color={data.status ? 'green' : 'red'}>{data.status ? 'Active' : 'Inactive'}</Badge>
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
          onClick={() => handleEditFaq(data)}
        >
          <IconPencil />
        </ActionIcon>
        <ActionIcon
          size={20}
          className={styles.actionButton}
          color="red"
          onClick={() => handleOpenModalDelete(data._id)}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
    ),
  }
];