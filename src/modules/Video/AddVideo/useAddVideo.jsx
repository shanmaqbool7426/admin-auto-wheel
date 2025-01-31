import { useState, useEffect } from 'react';
import { useUploadImageMutation } from '@/services/vehicle-manage';
import { notifications } from '@mantine/notifications';

export default function useAddVideo({ selectedVideo ,form}) {
  const [uploadImage] = useUploadImageMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Video categories
  const categories = [
    { value: 'reviews', label: 'Reviews' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'news', label: 'News' },
    { value: 'comparisons', label: 'Comparisons' }
  ];

  useEffect(() => {
    if (selectedVideo?.thumbnail) {
      setThumbnailPreview(selectedVideo.thumbnail);
    }
  }, [selectedVideo]);

  const handleThumbnailChange = async (file) => {
    if (file) {
      try {
        const previewUrl = URL.createObjectURL(file);
        setThumbnailPreview(previewUrl);

        const formData = new FormData();
        formData.append('images', file);
        
        const response = await uploadImage(formData).unwrap();

        form.setFieldValue('thumbnail', response?.data[0]);

        notifications.show({
          title: 'Success',
          message: 'Thumbnail uploaded successfully',
          color: 'green',
        });
      } catch (error) {
        console.log("  ", error);
        notifications.show({
          title: 'Error',
          message: error?.data?.message || 'Failed to upload thumbnail',
          color: 'red',
        });
        setThumbnailPreview(null);
      }
    }
  };

  return {
    handleThumbnailChange,
    thumbnailPreview,
    categories
  };
}