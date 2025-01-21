'use client'
import React from 'react';
import { Button } from '@mantine/core';
import styles from './CustomButton.module.css';

export default function CustomButton({ radius = '22px', color = '#E90808', children, ...rest }) {
  return (
    <Button
      color={color}
      radius={radius}
      {...rest}
      classNames={{
        root: styles.root,
        label: styles.label,
        section: styles.section,
      }}
    >
      {children}
    </Button>
  )
}
