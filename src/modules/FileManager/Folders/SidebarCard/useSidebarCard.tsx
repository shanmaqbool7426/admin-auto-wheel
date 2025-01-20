'use client';
import React, { useState } from 'react';

export default function useSidebarCard() {
  const [value, setValue] = useState(76);


  return {
    value,
  };
}
