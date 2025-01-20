'use client';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAddCategoryMutation } from '@/services/blog/categories';
import { notifications } from '@mantine/notifications';

export const generateSlug = (text) => {
  return text
    ? text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '')          // Trim - from end of text
    : '';
};

export default function useAddCategory() {
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      slug: '',
      parentCategory: '',
      description: '',
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
      slug: (value) => (!value ? 'Slug is required' : null),
    },
    transformValues: (values) => ({
      ...values,
      slug: generateSlug(values.slug), // Ensure slug is properly formatted on submit
    }),
  });

  // Watch name changes to update slug
  useEffect(() => {
    if (form.values.name && !isSlugManuallyEdited) {
      form.setFieldValue('slug', generateSlug(form.values.name));
    }
  }, [form.values.name, isSlugManuallyEdited]);

  // Reset form when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      form.setValues({
        name: selectedCategory.name || '',
        slug: selectedCategory.slug || '',
        parentCategory: selectedCategory.parentCategory || '', // Ensure this is set correctly
        description: selectedCategory.description || '',
      });
      setIsSlugManuallyEdited(false);
    } else {
      form.reset();
      setIsSlugManuallyEdited(false);
    }
  }, [selectedCategory]);

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
      if (selectedCategory) {
        await onUpdate(values);
      } else {
        await addCategory(values).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Category added successfully',
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