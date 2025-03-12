import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useSearchParams, useRouter } from 'next/navigation'
import {
  useAddPostMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from '@/services/blog/posts';

export default function useNewPost() {
  // navigate
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const [addPost, { isLoading }] = useAddPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const { data: getCategoriesData } = useGetCategoriesQuery();
  const catgData = getCategoriesData?.data?.data?.map(catg => ({ value: catg?._id, label: catg?.name })) || [];
  const { data: getTagsData } = useGetTagsQuery();
  const tagsData = getTagsData?.data?.data?.map(tag => ({ value: tag?._id, label: tag?.name })) || [];

  const { data: postDetails, isLoading: loadingPostDetails } = useGetPostByIdQuery(postId, { skip: !postId });


  const initialValues = {
    title: '',
    content: '',
    author: '',
    categories: [],
    tags: [],
    isSticky: false,
    visibility: 'Draft',
    publishDate: null,
    scheduledAt: null,
    imageUrl: null,
  };

  const form = useForm({
    initialValues: initialValues,
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      content: (value) => (!value ? 'Content is required' : null),
      categories: (value) => (!value.length ? 'At least one category is required' : null),
      imageUrl: (value, values) => {
        // Allow either new image upload or existing image
        if (!value && !values.existingImageUrl) {
          return 'Featured image is required';
        }
        return null;
      },
    },
    onValuesChange: (values) => {
    }
  });

  useEffect(() => {
    if (postId && postDetails) {
      form.setValues({
        title: postDetails?.data?.title || '',
        content: JSON.parse(postDetails?.data?.content) || '',
        author: postDetails?.data?.author || '',
        categories: postDetails?.data?.categories?.map(cat => cat._id) || [],
        tags: postDetails?.data?.tags?.map(tag => tag._id) || [],
        isSticky: postDetails?.data?.isSticky || false,
        visibility: postDetails?.data?.visibility || 'Draft',
        publishDate: postDetails?.data?.publishDate ? new Date(postDetails?.data?.publishDate) : null,
        scheduledAt: postDetails?.data?.scheduledAt ? new Date(postDetails?.data?.scheduledAt) : null,
        imageUrl: postDetails?.data?.imageUrl || null,
        existingImageUrl: postDetails?.data?.imageUrl || null,
      });
      console.log('form values after setValues:', form.values);
    }

  }, [postId, postDetails]);


  const handleSubmit = async (values) => {
    try {
      if (postId) {
        // For update, send form values directly with postId
        const updateData = {
          id: postId,
          title: values.title,
          content: JSON.stringify(values.content),
          author: values.author,
          categories: values.categories,
          tags: values.tags,
          isSticky: values.isSticky,
          visibility: values.visibility,
          publishDate: values.publishDate,
          scheduledAt: values.scheduledAt,
          imageUrl: values.imageUrl instanceof File 
            ? values.imageUrl 
            : values.existingImageUrl || values.imageUrl,
        };

        await updatePost(updateData).unwrap();
        router.push('/blog/all-posts');
        showNotification({
          title: 'Success',
          message: 'Blog post updated successfully',
          color: 'green',
        });
      } else {
        // For new post, use FormData as before
        const formData = new FormData();

        Object.keys(values).forEach(key => {
          if (key === 'existingImageUrl') {
            return;
          }
          if (key === 'categories' || key === 'tags') {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === 'imageUrl') {
            if (values[key] instanceof File) {
              formData.append('imageUrl', values[key]);
            } else if (values.existingImageUrl) {
              formData.append('imageUrl', values.existingImageUrl);
            }
          } else if (values[key] !== null) {
            formData.append(key, values[key]);
          }
        });

        await addPost(formData).unwrap();
        router.push('/blog/all-posts');
        showNotification({
          title: 'Success',
          message: 'Blog post created successfully',
          color: 'green',
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.data?.message || `Failed to ${postId ? 'update' : 'create'} blog post`,
        color: 'red',
      });
    }
  };

  return {
    form,
    catgData,
    tagsData,
    handleSubmit,
    isLoading: isLoading || isUpdating,
    isEdit: !!postId,
    loadingPostDetails,
  };
}