import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  useAddFooterLinkMutation,
  useUpdateFooterLinkMutation,
} from '@/services/footer';
import useBodies from '@/modules/Bodies/useBodies';

export default function useAddFooterLink({ footerLink, onClose ,selectedData}) {
  const [addFooterLink, { isLoading: isAdding }] = useAddFooterLinkMutation();
  
  const { bodiesData } = useBodies();
  const [updateFooterLink, { isLoading: isUpdating }] = useUpdateFooterLinkMutation();
// for select body type  check isArray

  const bodyOptions =Array.isArray(bodiesData) && bodiesData?.length > 0 && bodiesData?.map((body) => ({
    value: body._id,
    label: body.title,
  })) || [];

  console.log(">>>>>>>>>>>>>>//",selectedData?.title)

  const loading = isAdding || isUpdating;

  const form = useForm({
    initialValues: {
      title:  selectedData?.title || '',
      url:  selectedData?.url || '',
      order:  selectedData?.order || 0,
      section:  selectedData?.section || '',
      vehicleType:  selectedData?.vehicleType || '',
      status:  selectedData?.status || true,
    },
    validate: {
     
    },
  });


  console.log("selectedData?.vehicleType",selectedData)
  useEffect(() => {
    if (footerLink) {
      form.setValues({
        title: footerLink.title,
        url: footerLink.url,
        category: footerLink.category,
        order: footerLink.order,
        status: footerLink.status,
      });
    }
  }, [footerLink]);

  const handleSubmit = async (values) => {
    try {
      if (selectedData) {
        await updateFooterLink({
          id: selectedData._id,
          data: values,
        }).unwrap();
        showNotification({
          title: 'Success',
          message: 'Footer link updated successfully',
          color: 'green',
        });
      } else {
        await addFooterLink(values).unwrap();
        showNotification({
          title: 'Success',
          message: 'Footer link created successfully',
          color: 'green',
        });
      }
      onClose();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Failed to save footer link',
        color: 'red',
      });
    }
  };

  return {
    form,
    bodyOptions,
    loading,
    handleSubmit,
  };
}
