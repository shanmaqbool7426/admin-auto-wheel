import { Box } from '@mantine/core';

export const getColumns = () => [
  {
    accessor: 'name',
    title: 'Make Name',
    render: ({ name }) => (<Box style={{ textTransform: 'capitalize' }}>{name}</Box>)
  },
  {
    accessor: 'logo',
    title: 'Logo',
    render: ({ logo }) => (
      <Box>
        <img src={logo} alt="make logo" style={{ height: 40 }} />
      </Box>
    )
  },
  {
    accessor: 'slug',
    title: 'Slug',
  },
  {
    accessor: 'vehicleCount',
    title: 'Vehicles',
    textAlign: 'center',
  },
]; 