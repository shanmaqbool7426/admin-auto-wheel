'use client';
import { useState,useEffect } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    page,
    limit: PAGE_SIZE,
    search: searchBy,
    category: selectedCategory
  });


  useEffect(() => {
    setFilterParams({
      page: page,
      limit: PAGE_SIZE,
      search: searchBy,
      category: selectedCategory
      });
  }, [page, searchBy, selectedCategory]);
  const { data: videosData, isLoading, isFetching } = useGetVideosQuery(filterParams);
  const [addVideo, { isLoading: loadingAdd }] = useAddVideoMutation();
  const [updateVideo, { isLoading: loadingUpdate }] = useUpdateVideoMutation();
  const [deleteVideo, { isLoading: loadingDelete }] = useDeleteVideoMutation();

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
      type: '',
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      url: (value) => (!value ? 'Video URL is required' : null),
      category: (value) => (!value ? 'Category is required' : null),
    },
  });


  // Handle Edit Video
  const handleEditVideo = (video) => {
    setSelectedVideo(video);
    setModalTitle('Edit Video');
    setOpenModalVideo(true);
    formVideo.setValues({
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail,
      category: video.category,
    });
  };

  // Handle Modal Open/Close
  const handleOpenModal = (title, video) => {
    setModalTitle(title);
    setSelectedVideo(video);
    setOpenModalVideo(true);
    if (!video) {
      formVideo.reset();
    }
  };

  const handleCloseModal = () => {
    setOpenModalVideo(false);
    setSelectedVideo(null);
    setModalTitle('New Video');
    formVideo.reset();
  };

  // Handle Delete
  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setSelectedId(null);
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(selectedId).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Video deleted successfully',
        color: 'green',
      });
      handleCloseModalDelete();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  // Form submission
  const handleSubmit = async (values) => {
    try {
      if (modalTitle === 'Edit Video') {
        await updateVideo({
          id: selectedVideo._id,
          body: values
        }).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Video updated successfully',
          color: 'green',
        });
      } else {
        await addVideo(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Video added successfully',
          color: 'green',
        });
      }
      handleCloseModal();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    page,
    setPage,
    isLoading,
    isFetching,
    videosData: videosData?.data,
    selectedRecords,
    setSelectedRecords,
    setSearchBy,
    setSelectedCategory,
    filterParams,
    setFilterParams,
    selectedCategory,
    // Video Modal
    modalTitle,
    openModalVideo,
    handleOpenModal,
    handleCloseModal,
    selectedVideo,
    formVideo,
    loadingModal: loadingAdd || loadingUpdate,
    handleSubmit,
    
    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditVideo,
  };
}