import { useForm } from '@mantine/form';
import { useAddComparisonSetMutation, useUpdateComparisonSetMutation } from '@/services/comparison';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

const useAddComparison = (setOnClose, comparison, vehicles) => {
  const form = useForm({
    initialValues: {
      vehicle1: '',
      vehicle2: '',
      type: '',
    },
    validate: {
      vehicle1: (value) => (!value ? 'Vehicle 1 is required' : null),
      vehicle2: (value) => (!value ? 'Vehicle 2 is required' : null),
    },
  });

  const [addComparisonSet] = useAddComparisonSetMutation()
  const [updateComparisonSet] = useUpdateComparisonSetMutation()

  const handleSubmit = async (values) => {
    try {
      const {vehicle1, vehicle2} = vehicles
      
      const payload = [vehicle1, vehicle2]
      if(comparison){
        await updateComparisonSet({
          id: comparison._id,
          data: {vehicles: payload, type: form.values.type}
        }).unwrap();
        
        notifications.show({
          title: 'Success',
          message: 'Comparison updated successfully',
          color: 'green',
        });
      } else {
        await addComparisonSet({
          vehicles: payload,
          type: form.values.type
        }).unwrap();
        
        notifications.show({
          title: 'Success',
          message: 'Comparison added successfully',
          color: 'green',
        });
      }
      setOnClose(false);
    } catch (error) {
      console.error('Error:', error);
      
      // Handle different types of errors
      let errorMessage = 'An unexpected error occurred';
      
      if (error.status === 409) {
        errorMessage = 'This comparison already exists';
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: false,
  };
};

export default useAddComparison;