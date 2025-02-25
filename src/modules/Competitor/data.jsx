import { ActionIcon, Group, Text, Image } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

export const getColumns = (handleEdit, handleDelete) => [
  {
    accessor: 'vehicle',
    title: 'Main Vehicle',
    render: ({ vehicle }) => (
      <Group>
        <Image
          src={vehicle.defaultImage}
          width={50}
          height={50}
          alt={`${vehicle.make} ${vehicle.model}`}
        />
        <div>
          <Text size="sm" weight={500}>
            {vehicle.make} {vehicle.model}
          </Text>
          {vehicle.variant && (
            <Text size="xs" color="dimmed">
              {vehicle.variant}
            </Text>
          )}
        </div>
      </Group>
    ),
  },
  {
    accessor: 'competitors',
    title: 'Competitors',
    render: ({ competitors }) => (
      <Group>
        {competitors.map((competitor) => (
          <Group  key={competitor._id} gap="xs" align="center" >
            <Text size="sm">{competitor.make} {competitor.model} {competitor.variant || ''}</Text>
            <Image
              src={competitor.defaultImage}
              width={40}
              height={40}
              alt={`${competitor.make} ${competitor.model}`}
            title={`${competitor.make} ${competitor.model} ${competitor.variant || ''}`}
            />
          </Group>
        ))}
      </Group>
    ),
  },
  {
    accessor: 'type',
    title: 'Type',
    render: ({ type }) => <Text transform="capitalize">{type}</Text>
  },
  {
    accessor: 'createdAt',
    title: 'Created At',
    render: ({ createdAt }) => (
      <>
        <Text size="sm">{dayjs(createdAt).format('DD-MM-YYYY')}</Text>
        <Text size="xs" color="dimmed">{dayjs(createdAt).format('hh:mm A')}</Text>
      </>
    ),
  },
  {
    accessor: 'actions',
    title: 'Actions',
    textAlign: 'center',
    render: (record) => (
      <Group gap="xs" justify="center">
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => handleEdit('Edit Competitor Set', record)}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => handleDelete(record._id)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    ),
  },
];

export const getVehicleColumns = (onSelect, selectedVehicles) => [
  {
    accessor: 'defaultImage',
    title: 'Image',
    width: 80,
    render: (record) => (
      <Image
        src={record.defaultImage}
        width={60}
        height={60}
        alt={`${record.make} ${record.model}`}
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
    accessor: 'actions',
    title: 'Action',
    textAlign: 'center',
    render: (record) => {
      const isSelected = selectedVehicles?.some(v => v._id === record._id);
      return (
        <CustomButton
          size="xs"
          variant={isSelected ? 'filled' : 'light'}
          color={isSelected ? 'blue' : 'gray'}
          onClick={() => !isSelected && onSelect(record)}
        >
          {isSelected ? 'Selected' : 'Select'}
        </CustomButton>
      );
    },
  },
]; 