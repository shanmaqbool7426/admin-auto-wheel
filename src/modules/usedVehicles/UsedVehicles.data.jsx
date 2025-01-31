import Image from 'next/image';
import dayjs from 'dayjs';
import { ActionIcon, Group, Box, Badge } from '@mantine/core';
// Import icons from @tabler/icons-react
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import styles from './UsedVehicles.module.css';
import FormField from '@/components/FormField';

export const getColumns = (handleEdit, handleDelete, router, handleStatusChange) => {
    return [
        {
            accessor: 'image',
            title: 'Vehicle',
            render: (row) => (
                <Box className={styles.vehicle}>
                    <Box className={styles.vehicleImage}>
                        <Image 
                  src={row?.images[0] || '/placeholder-vehicle.png'} 
                  alt={`${row.make} ${row.model}`} 
                  width={80} 
                  height={60} 
                  style={{ objectFit: 'cover' }}
                />
                    </Box>
                    <Box className={styles.vehicleInfo}>
                        <Box className={styles.vehicleName}>{row.Info?.make} {row.Info?.model}</Box>
                        <Box className={styles.vehicleVariant}>{row.Info?.variant}</Box>
                    </Box>
                </Box>
            ),
        },
        {
            accessor: 'type',
            title: 'Type',
            render: (row) => (
                <Badge
                    color={row.type === 'car' ? 'blue' : row.type === 'bike' ? 'green' : 'orange'}
                >
                    {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                </Badge>
            )
        },
        // status are  'active', 'inactive', 'deleted', 'pending', 'expired'
        {
            accessor: 'status',
            title: 'Status',
            render: (row) => (
                <FormField
                    type="select"
                    value={row.status}
                    data={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'deleted', label: 'Deleted' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'expired', label: 'Expired' },
                    ]}
                    onChange={(_value, option) => handleStatusChange(row._id, option.value)}
                />
            )
        },
        {
            accessor: 'price',
            title: 'Price Range',
            render: (row) => (
                <Box>
                    {row.minPrice && row.maxPrice ? (
                        `₹${row.minPrice.toLocaleString()} - ₹${row.maxPrice.toLocaleString()}`
                    ) : 'Price on Request'}
                </Box>
            )
        },
        {
            accessor: 'createdAt',
            title: 'Added Date',
            render: (row) => (
                <>
                    <Box className={styles.createdDate}>
                        {dayjs(row.createdAt).format('DD-MM-YYYY')}
                    </Box>
                    <Box className={styles.createdTime}>
                        {dayjs(row.createdAt).format('hh:mm A')}
                    </Box>
                </>
            ),
        },
        {
            accessor: 'views',
            title: 'Views',
            render: (row) => row.views || 0,
        },
        {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'center',
            render: (row) => (
                <Group justify="center" gap="xs">
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="blue"
                        onClick={() => router.push(`https://new-auto-wheel.netlify.app/new-vehicle/${row.slug}`)}
                    >
                        <IconEye size={16} />
                    </ActionIcon>
                        {/* <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="blue"
                            onClick={() => handleEdit(row._id)}
                        >
                            <IconEdit size={16} />
                        </ActionIcon> */}
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(row._id)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];
}

