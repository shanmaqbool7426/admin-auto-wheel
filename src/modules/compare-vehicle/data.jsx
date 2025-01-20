import { Button, Image, Text, Group } from '@mantine/core';
import { IconScale } from '@tabler/icons-react';

export const getColumns = (onClickCompare, selectedVehicles) => [
  {
    accessor: 'defaultImage',
    title: 'Image',
    width: 120,
    render: (record) => (
      <Image
        src={record.defaultImage}
        alt={`${record.make} ${record.model}`}
        height={60}
        fit="contain"
      />
    ),
  },
  {
    accessor: 'make',
    title: 'Make',
  },
  {
    accessor: 'model',
    title: 'Model',
  },
  {
    accessor: 'variant',
    title: 'Variant',
  },
  {
    accessor: 'type',
    title: 'Type',
    render: ({ type }) => <Text transform="capitalize">{type}</Text>
  },
  {
    accessor: 'actions',
    title: 'Compare',
    textAlign: 'center',
    render: (record) => {
      const isSelected = selectedVehicles.some(v => v._id === record._id);
      
      return (
        <Button
          size="xs"
          variant={isSelected ? 'filled' : 'light'}
          color={isSelected ? 'blue' : 'gray'}
          onClick={() => onClickCompare(record)}
          leftSection={<IconScale size={16} />}
        >
          {isSelected ? 'Added' : 'Compare'}
        </Button>
      );
    },
  },
];