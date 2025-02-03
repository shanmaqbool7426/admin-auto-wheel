'use client';
import React from 'react';
import { Box, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import useAddFooterLink from './useAddFooterLink';
import styles from '../Links.module.css';
import { vehicleTypes, footerSections } from '../data';
import FormField from '@/components/FormField';

export default function AddFooterLink({ footerLink, onClose ,selectedData}) {
  const {
    form,
    bodyOptions,
    loading,
    handleSubmit,
  } = useAddFooterLink({ footerLink, onClose ,selectedData});
console.log("selectedData...",selectedData)

  const handleSectionSubmit = (values) => {
    form.setFieldValue('section', values);
  };

  const handleVehicleTypeSubmit = (values) => {
    form.setFieldValue('vehicleType', values);
  };


  return (
    <CustomModal
      open={true}
      title={footerLink ? 'Edit Footer Link' : 'Add Footer Link'}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
        <Group grow align="flex-start" mb="md">
        <FormField
            label="Vehicle Type"
            type="select"
            data={vehicleTypes}
            placeholder="Select vehicle type"
            {...form.getInputProps('vehicleType')}
            value={form.values.vehicleType}
            searchable
            
            onChange={(value) => handleVehicleTypeSubmit(value)}
          />
          <FormField
            label="Section"
            type="select"
            placeholder="Select section"
            {...form.getInputProps('section')}
            value={form.values.section}
            data={footerSections}
            searchable
            required
            onChange={(value) => handleSectionSubmit(value)}
          />

        </Group>
        {/* <FormField
          type="select"
          name="actions"
          data={bodyOptions}
          placeholder="Select body type"
          checkIconPosition="right"
          {...form.getInputProps('bodyType')}
        /> */}

        <FormField
          label="Title:"
          placeholder="Enter title"
          {...form.getInputProps('title')}
        />
        <FormField
          label="URL:"
          placeholder="Enter URL"
          {...form.getInputProps('url')}
        />
        {/* <FormField
          label="Category"
          placeholder="Enter category"
        
          {...form.getInputProps('category')}
        /> */}
        <FormField
          label="Order"
          type="number"
          placeholder="Enter order"
          
          {...form.getInputProps('order')}
        />
        <FormField
          label="Status"
          type="switch"
          {...form.getInputProps('status', { type: 'checkbox' })}
        />

        <Box className={styles.formFooter}>
          <CustomButton
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            loading={loading}
          >
            {footerLink ? 'Update' : 'Create'}
          </CustomButton>
        </Box>
      </form>
    </CustomModal>
  );
}
