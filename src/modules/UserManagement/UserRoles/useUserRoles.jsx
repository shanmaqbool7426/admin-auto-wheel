'use client';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';

export function useUserRoles() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return {
    isOpenModal,
    setIsOpenModal,
  };
}
