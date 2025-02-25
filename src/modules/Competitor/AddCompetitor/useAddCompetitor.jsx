import { useForm } from '@mantine/form';
import { useAddCompetitorMutation, useUpdateCompetitorMutation } from '@/services/competitor';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import { useEffect } from 'react';

export default function useAddCompetitor(setOnClose, editData) {
  const [addCompetitor, { isLoading: isLoadingAdd }] = useAddCompetitorMutation();
  const [updateCompetitor, { isLoading: isLoadingUpdate }] = useUpdateCompetitorMutation();

  const form = useForm({
    initialValues: {
      type: '',
      vehicle: null,
      competitors: []
    },
    validate: {
      type: (value) => (!value ? 'Vehicle type is required' : null),
      vehicle: (value) => (!value ? 'Main vehicle is required' : null),
      competitors: (value) => (!value?.length ? 'At least one competitor is required' : null),
    }
  });

  useEffect(() => {
    if (editData) {
      form.setValues({
        type: editData.type || '',
        vehicle: editData.vehicle || null,
        competitors: editData.competitors || []
      });
    } else {
      form.reset();
    }
  }, [editData]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        type: values.type,
        vehicle: values.vehicle,
        competitors: values.competitors
      };

      if (editData) {
        await updateCompetitor({ id: editData._id, data: payload }).unwrap();
        successSnackbar('Competitor updated successfully');
      } else {
        await addCompetitor(payload).unwrap();
        successSnackbar('Competitor added successfully');
      }
      
      setOnClose();
      form.reset();
    } catch (error) {
      errorSnackbar(error?.data?.message || 'Something went wrong');
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: isLoadingAdd || isLoadingUpdate
  };
}