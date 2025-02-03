import { useForm } from '@mantine/form';
import { useAddComparisonSetMutation, useUpdateComparisonSetMutation } from '@/services/comparison';
const useAddComparison = (setOnClose, comparison,vehicles) => {
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
      const {vehicle1,vehicle2} = vehicles
      
      const payload = [vehicle1,vehicle2]
      if(comparison){
        await updateComparisonSet({id:comparison._id,data:{vehicles:payload,type:form.values.type}})
      }else{
        await addComparisonSet({vehicles:payload,type:form.values.type}).unwrap()
      }
      setOnClose(false);
    //   form.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: false,
  };
};

export default useAddComparison;