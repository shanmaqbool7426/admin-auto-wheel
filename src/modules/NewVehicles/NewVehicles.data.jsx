import Image from 'next/image';
import dayjs from 'dayjs';
import { ActionIcon, Group, Box, Badge } from '@mantine/core';
// Import icons from @tabler/icons-react
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import styles from './NewVehicles.module.css';
import Link from 'next/link';

export const getColumns = (handleEdit, handleOpenDeleteModal, router) => {
    return [
        {
            accessor: 'image',
            title: 'Vehicle',
            render: (row) => (

                <Box className={styles.vehicle}>
                    <Box className={styles.vehicleImage}>
                        <Image
                            src={row?.defaultImage}
                            alt={`${row.make} ${row.model}`}
                            width={80}
                            height={60}
                            style={{ objectFit: 'cover' }}
                        />
                    </Box>
                    {console.log("row....", row?.defaultImage)}
                    <Box className={styles.vehicleInfo}>
                        <Box className={styles.vehicleName}>{row.make} {row.model}</Box>
                        <Box className={styles.vehicleVariant}>{row.variant}</Box>
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
                    <Link href={`https://new-auto-wheel.netlify.app/new-vehicle/${row.slug}`} target='_blank'>
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="blue"

                        >
                            <IconEye size={16} />
                        </ActionIcon>
                    </Link>
                    <Link href={`/vehicle-add?id=${row._id}`}>
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="blue"
                        // onClick={() => handleEdit(row._id)}
                        >

                            <IconEdit size={16} />
                        </ActionIcon>
                    </Link>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => handleOpenDeleteModal(row._id)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];
}

