'use client';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export default function useLocations() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    actions: '',
    news: '',
    date: '',
  });
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickAction = (id) => {
    console.log('Edit Row', id);
    alert(`Edit Row ${id}`);
  }


  return {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickAction,
    setIsLocationModalOpen,
    isLocationModalOpen
  };
}
