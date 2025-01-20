'use client';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAddTagMutation } from '@/services/blog/tags';
import { notifications } from '@mantine/notifications';

export const generateSlug = (text) => {
  return text
    ? text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    : '';
};

export default function useAddTag({ handleClose, selectedTag, onUpdate }) {
  const [addTag, { isLoading: isAdding }] = useAddTagMutation();
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      slug: '',
      description: '',
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
      slug: (value) => (!value ? 'Slug is required' : null),
    },
    transformValues: (values) => ({
      ...values,
      slug: generateSlug(values.slug),
    }),
  });

  useEffect(() => {
    if (form.values.name && !isSlugManuallyEdited) {
      form.setFieldValue('slug', generateSlug(form.values.name));
    }
  }, [form.values.name, isSlugManuallyEdited]);

  useEffect(() => {
    if (selectedTag) {
      form.setValues({
        name: selectedTag.name || '',
        slug: selectedTag.slug || '',
        description: selectedTag.description || '',
      });
      setIsSlugManuallyEdited(false);
    } else {
      form.reset();
      setIsSlugManuallyEdited(false);
    }
  }, [selectedTag]);

  const handleNameChange = (event) => {
    form.setFieldValue('name', event.target.value);
    if (!isSlugManuallyEdited) {
      form.setFieldValue('slug', generateSlug(event.target.value));
    }
  };

  const handleSlugChange = (event) => {
    setIsSlugManuallyEdited(true);
    form.setFieldValue('slug', generateSlug(event.target.value));
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedTag) {
        await onUpdate(values);
      } else {
        await addTag(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Tag added successfully',
          color: 'green',
        });
      }
      
      form.reset();
      setIsSlugManuallyEdited(false);
      handleClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    handleNameChange,
    handleSlugChange,
    isLoading: isAdding,
  };
}