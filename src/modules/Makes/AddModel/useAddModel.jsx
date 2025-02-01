// auto-wheel-admin/src/modules/Makes/AddModel/useAddModel.js
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { useGetMakesQuery, useAddModelMutation, useUpdateModelMutation } from '@/services/make';

export default function useAddModel(setOnClose, editData) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: makesData } = useGetMakesQuery();
  const [addModel] = useAddModelMutation();
  const [updateModel] = useUpdateModelMutation();

  const form = useForm({
    initialValues: {
      makeId: editData?.make?._id || '',
      name: editData?.name || '',
      type: editData?.make?.type || ''
    },
    validate: {
      makeId: (value) => (!value ? 'Make is required' : null),
      name: (value) => (!value ? 'Model name is required' : null),
      type: (value) => (!value ? 'Vehicle type is required' : null)
    }
  });

  // Set initial values when editData changes
  useEffect(() => {
    if (editData) {
      form.setValues({
        makeId: editData.make._id,
        name: editData.name,
        type: editData.make.type
      });
    }
  }, [editData]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      console.log(',,,,,,,,,,,,,,,,,,,,')
      if (editData) {
        console.log("editData>>",editData)
        // Update existing model
        await updateModel({
          id: editData._id,
          makeId: editData.make._id,
          data: {
            name: values.name,
            oldName: editData.name,
            type: values.type,
            makeId: values.makeId
          }
        }).unwrap();
      } else {
        // Add new model
        console.log("values>>",values)
        await addModel(values).unwrap();
      }
      
      setOnClose(false);
      form.reset();
    } catch (error) {
      console.error('Error saving model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("editData>>",editData)

  const filteredMakes = useMemo(() => {
    if (!form.values.type || !makesData?.data) return [];
    
    return makesData.data
      .filter(make => make.type === form.values.type)
      .map(make => ({
        value: make._id,
        label: make.name
      }));
  }, [makesData?.data, form.values.type]);

  // Reset makeId when vehicle type changes
  useEffect(() => {
    if (!editData) {
      form.setFieldValue('makeId', null);
    }
  }, [form.values.type]);

  return {
    form,
    handleSubmit,
    isLoading,
    makesData,
    filteredMakes
  };
}