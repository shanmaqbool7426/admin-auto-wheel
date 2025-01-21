'use client';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} from '@/services/video';

export default function useVideo() {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    page,
    limit: PAGE_SIZE,
    search: searchBy,
  });

  // const { data: videosData, isLoading, isFetching } = useGetVideosQuery(filterParams);
  // const [addVideo, { isLoading: loadingAdd }] = useAddVideoMutation();
  // const [updateVideo, { isLoading: loadingUpdate }] = useUpdateVideoMutation();
  // const [deleteVideo, { isLoading: loadingDelete }] = useDeleteVideoMutation();

  // Modal states
  const [openModalVideo, setOpenModalVideo] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Video');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const formVideo = useForm({
    initialValues: {
      title: '',
      description: '',
      url: '',
      thumbnail: null,
      category: '',
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      url: (value) => (!value ? 'Video URL is required' : null),
      category: (value) => (!value ? 'Category is required' : null),
    },
  });

  // Continue in next message due to length...
}