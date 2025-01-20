'use client';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';

export default function useUserRoles() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  console.log('isOpenModal', isOpenModal);

  return {
    isOpenModal,
    setIsOpenModal,
  };
}
