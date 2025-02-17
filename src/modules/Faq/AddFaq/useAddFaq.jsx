'use client';
import { useForm } from '@mantine/form';
import { useCreateFaqMutation, useUpdateFaqMutation } from '@/services/faq';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export default function useAddFaq({ editData, onClose }) {
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  const form = useForm({
    initialValues: {
      type: editData?.type || '',
      question: editData?.question || '',
      answer: editData?.answer || '',
      status: editData?.status ?? true,
    },
    validate: {
      type: (value) => (!value ? 'Type is required' : null),
      question: (value) => (!value ? 'Question is required' : null),
      answer: (value) => (!value ? 'Answer is required' : null),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues({
        type: editData.type || '',
        question: editData.question || '',
        answer: editData.answer || '',
        status: editData.status ?? true,
      });
    } else {
      form.reset(); // Reset form when not editing
    }
  }, [editData]);

  const handleSubmit = async (values) => {
    try {
      if (editData?._id) {
        await updateFaq({
          id: editData._id,
          data: values
        }).unwrap();
        
        notifications.show({
          title: 'Success',
          message: 'FAQ updated successfully',
          color: 'green',
        });
      } else {
        await createFaq(values).unwrap();
        
        notifications.show({
          title: 'Success',
          message: 'FAQ created successfully',
          color: 'green',
        });
      }
      
      onClose();
      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || `Failed to ${editData ? 'update' : 'create'} FAQ`,
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: isCreating || isUpdating,
  };
}