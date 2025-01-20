import dayjs from 'dayjs';
import { ActionIcon, Group, Box } from '@mantine/core';
import Image from 'next/image';
import styles from './LatestUsers.module.css';
import { ImgPostVehicle } from '@/assets/images';

export const columns = [
  {
    accessor: 'post',
    title: 'Post',
    render: ({ title, image, model }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={image} alt="car" width={44} height={36} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{title}</Box>
            <Box className={styles.tableTitleModal}>{model}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'createdDate',
    title: 'Created',
    render: ({ createdDate }) => {
      return (
        <>
          <Box className={styles.createdDate}>
            {dayjs(createdDate).format('DD--MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(createdDate).format('hh:mm A')}
          </Box>
        </>
      )
    },
  },
  {
    accessor: 'email',
    title: 'Email',
  },
  {
    accessor: 'followers',
    title: 'Followers',
  },
  {
    accessor: 'location',
    title: 'Location',
  },
  {
    accessor: 'activeAds',
    title: 'Active Ads',
    textAlign: 'center',
  },
  {
    accessor: 'pendingAds',
    title: 'Pending Ads',
    textAlign: 'center',
  },
]

export const data = [
  {
    id: "6f9sd34969a0f1",
    title: "USED 2.0 L 2020 KIA Picanto...",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Perth",
    activeAds: "154",
    pendingAds: '400',
  },
  {
    id: "6f9sd34969a0f2",
    title: "Stock ID 24563",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Sydney",
    activeAds: "154",
    pendingAds: '300',
  },
  {
    id: "6f9sd34969a0f3",
    title: "Stock ID 24563",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Perth",
    activeAds: "154",
    pendingAds: '300',
  },
  {
    id: "6f9sd34969a0f4",
    title: "Stock ID 24563",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Perth",
    activeAds: "154",
    pendingAds: '200',
  },
  {
    id: "6f9sd34969a0f5",
    title: "Stock ID 24563",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Perth",
    activeAds: "154",
    pendingAds: '200',
  },
  {
    id: "6f9sd34969a0f6",
    title: "Stock ID 24563",
    model: "2016 Ford Escape",
    image: ImgPostVehicle,
    createdDate: new Date(),
    followers: '1325',
    email: "abc@gmail.com",
    location: "Perth",
    activeAds: "154",
    pendingAds: '300',
  },
]