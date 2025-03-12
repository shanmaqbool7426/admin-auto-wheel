import { ActionIcon, Group, Text, Badge } from '@mantine/core';
import { IconPencil, IconTrash } from '@/assets/icons';

export const vehicleTypes = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'truck', label: 'Truck' },
    { value: 'all', label: 'All' }
];

export const footerSections = [
    { value: 'by-make', label: 'By Make' },
    { value: 'by-province', label: 'By Province' },
    { value: 'explore-autowheels', label: 'Explore AutoWheels' },
    { value: 'autowheels', label: 'Autowheels.com' },
    { value: 'sell-on-autowheels', label: 'Sell On AutoWheels' },
    { value: 'by-category', label: 'By Category' },
    { value: 'by-body-type', label: 'By Body Type' },
    { value: 'by-color', label: 'By Color' },
    { value: 'by-city', label: 'By City' },

     {value: 'used-by-city', label: 'Used  by City'}, 
     {value: "popular-used", label: 'Popular Used'} 
];

export const getColumns = ({ onEdit, onDelete }) => [
  {
    accessor: 'title',
    title: 'Title',
    render: (row) => <Text>{row.title}</Text>
  },
  {
    accessor: 'url',
    title: 'URL',
    render: (row) => (
      <Text style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {row.url}
      </Text>
    )
  },
  {
    accessor: 'section',
    title: 'Section',
    render: (row) => <Text>{row.section}</Text>
  },
  {
    accessor: 'order',
    title: 'Order',
    render: (row) => <Text>{row.order}</Text>
  },
  {
    accessor: 'status',
    title: 'Status',
    render: (row) => (
      <Badge color={row.status ? 'green' : 'red'}>
        {row.status ? 'Active' : 'Inactive'}
      </Badge>
    )
  },
  {
    accessor: 'actions',
    title: 'Actions',
    render: (row) => (
      <Group gap={4}>
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => onEdit(row)}
        >
          <IconPencil size={16} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => onDelete(row)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    )
  }
];
