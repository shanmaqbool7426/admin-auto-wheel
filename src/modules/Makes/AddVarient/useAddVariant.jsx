// auto-wheel-admin/src/modules/Makes/AddVariant/useAddVariant.js
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { useGetMakesQuery, useAddVariantMutation, useUpdateVariantMutation ,useDeleteVariantMutation} from '@/services/make';

export default function useAddVariant(setOnClose, editData) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: makesData } = useGetMakesQuery();
  const [addVariant] = useAddVariantMutation();
  const [updateVariant] = useUpdateVariantMutation();
  const [deleteVariant] = useDeleteVariantMutation();

  const form = useForm({
    initialValues: {
      type: editData?.make?.type || '',
      makeId: editData?.make?._id || '',
      modelId: editData?.model?._id || '',
      name: editData?.name || '',
    },
    validate: {
      type: (value) => (!value ? 'Vehicle type is required' : null),
      makeId: (value) => (!value ? 'Make is required' : null),
      modelId: (value) => (!value ? 'Model is required' : null),
      name: (value) => (!value ? 'Variant name is required' : null),
    }
  });

  console.log("editData>>>>>>>",editData)
  useEffect(() => {
    if (editData) {
      form.setValues({
        type: editData.make.type,
        makeId: editData.make._id,
        modelId: editData.model._id,
        name: editData.name,
      });
    }
  }, [editData]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (editData) {
        await updateVariant({
          id: editData._id,
          makeId: values.makeId,
          modelId: values.modelId,
          data: {
            name: values.name,
            oldName: editData.name
          }
        }).unwrap();
      } else {
        await addVariant({
          data: {
            makeId: values.makeId,
            modelId: values.modelId,
            name: values.name
          }
        }).unwrap();
      }
      
      setOnClose(false);
      form.reset();
    } catch (error) {
      console.error('Error saving variant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMakes = useMemo(() => {
    if (!form.values.type || !makesData?.data) return [];
    
    return makesData.data
      .filter(make => make.type === form.values.type)
      .map(make => ({
        value: make._id,
        label: make.name
      }));
  }, [makesData?.data, form.values.type]);

  const filteredModels = useMemo(() => {
    if (!form.values.makeId || !makesData?.data) return [];
    
    const selectedMake = makesData.data.find(make => make._id === form.values.makeId);
    return selectedMake?.models.map(model => ({
      value: model._id,
      label: model.name
    })) || [];
  }, [makesData?.data, form.values.makeId]);

  // Reset makeId and modelId when type changes
  useEffect(() => {
    if (!editData) {
      form.setFieldValue('makeId', null);
      form.setFieldValue('modelId', null);
    }
  }, [form.values.type]);

  // Reset modelId when make changes
  useEffect(() => {
    if (!editData) {
      form.setFieldValue('modelId', null);
    }
  }, [form.values.makeId]);

  return {
    form,
    handleSubmit,
    isLoading,
    makesData,
    filteredMakes,
    filteredModels
  };
}