import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import { useAddMakeMutation, useUpdateMakeMutation } from '@/services/make';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';

export default function useAddMake(setOnClose, editData = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(editData?.companyImage || null);
  const [addMake] = useAddMakeMutation();
  const [updateMake] = useUpdateMakeMutation();

  // Initialize form with editData if available
  const form = useForm({
    initialValues: {
      name: editData?.name?.trim() || '',
      type: editData?.type || '',
      companyImage: null,
      description: editData?.description?.trim() || ''
    },
    validate: {
      name: (value) => {
        if (!value) return 'Make name is required';
        const trimmedValue = value.trim();
        if (!trimmedValue) return 'Make name cannot be only spaces';
        return null;
      },
      type: (value) => (!value ? 'Vehicle type is required' : null),
      companyImage: (value) => {
        if (!editData && !value) return 'Brand companyImage is required';
        return null;
      },
    },
    transformValues: (values) => ({
      ...values,
      name: values.name.trim(),
      description: values.description.trim()
    })
  });

  console.log("editDat acmodeeeeeee",editData)
  // Set initial values when editData changes
  useEffect(() => {
    if (editData) {
      console.log('Setting edit data:', editData);
      // form.reset(); // Reset form before setting new values
      form.setValues({
        name: editData.name,
        type: editData.type,
        description: editData.description || '',
        companyImage: null // Don't set file input value
      });
      setLogoPreview(editData.companyImage);
    }
  }, [editData]);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        form.setFieldError('companyImage', 'File size must be less than 2MB');
        return;
      }

      // Validate file type
      if (!file.type.match('image.*')) {
        form.setFieldError('companyImage', 'Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Set form value
      form.setFieldValue('companyImage', file);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('type', values.type);
      formData.append('description', (values.description || '').trim());
      
      if (values.companyImage instanceof File) {
        formData.append('companyImage', values.companyImage);
      }

      if (editData) {
        await updateMake({ id: editData._id, data: formData }).unwrap();
        successSnackbar('Make updated successfully');
      } else {
        await addMake(formData).unwrap();
        successSnackbar('Make added successfully');
      }
      
      setOnClose(false);
    } catch (error) {
      console.error('Error saving make:', error);
      errorSnackbar(error.data?.message || 'Error saving make');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    handleLogoUpload,
    logoPreview
  };
}