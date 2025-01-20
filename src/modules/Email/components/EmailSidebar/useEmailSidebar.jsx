import React from 'react';
import { useForm } from '@mantine/form';

export default function useEmailSidebar() {
  const [searchBy, setSearchBy] = React.useState(null);

  return {
    setSearchBy,
  };
}
