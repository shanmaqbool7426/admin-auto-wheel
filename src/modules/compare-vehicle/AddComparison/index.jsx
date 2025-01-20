import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import { Grid } from '@mantine/core';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import useAddComparison from './useAddComparison';
import MakeModelVariantModel from '@/components/MakeModelVariantModel';

export default function AddComparison({ open, setOnClose, comparison }) {
  const {
    form,
    handleSubmit,
    isLoading,
  } = useAddComparison(setOnClose, comparison);

  const [isMakeModelOpen, setIsMakeModelOpen] = useState(false);
  const [selection, setSelection] = useState({
    make: comparison?.make || '',
    model: comparison?.model || '',
    variant: comparison?.variant || '',
  });

  console.log("comparison>>>>>>>", comparison)
  const [activeField, setActiveField] = useState(''); // 'vehicle1' or 'vehicle2'

  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
    setIsMakeModelOpen(true);
  };

  const handleMakeModelSelect = (selectedData) => {
    console.log('selectedData', selectedData)
    const formattedValue = `${selectedData.make} ${selectedData.model}${selectedData.variant ? ' ' + selectedData.variant : ''}`;

    form.setFieldValue(activeField, formattedValue);
    setIsMakeModelOpen(false);
  };


  useEffect(() => {
    form.setFieldValue(activeField, `${selection.make} ${selection.model}${selection.variant ? ' ' + selection.variant : ''}`);
  }, [selection])

  useEffect(() => {
    if (comparison) {
      comparison?.vehicles?.map((item) => {
        form.setFieldValue('vehicle1', `${item.make} ${item.model}${item.variant ? ' ' + item.variant : ''}`);
        form.setFieldValue('vehicle2', `${item.make} ${item.model}${item.variant ? ' ' + item.variant : ''}`);
      })  
      form.setFieldValue('type', `${comparison?.type}`);

    }
  }, [comparison])


  return (
    <>
      <CustomModal
        title={comparison ? "Edit Comparison" : "Add Comparison"}
        open={open}
        onClose={() => setOnClose(false)}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter="30px">
            <Grid.Col span={12}>
              <FormField
                label="Vehicle Type:"
                type="select"
                placeholder="Select Vehicle Type"
                data={[
                  { value: 'car', label: 'Car' },
                  { value: 'bike', label: 'Bike' },
                  { value: 'truck', label: 'Truck' },
                ]}
                {...form.getInputProps('type')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FormField
                label="Vehicle 1:"
                type="text"
                placeholder="Enter Vehicle 1"
                readOnly
                onClick={() => {
                  setIsMakeModelOpen(true)
                  setActiveField('vehicle1')
                }}
                style={{ cursor: 'pointer' }}
                {...form.getInputProps('vehicle1')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FormField
                label="Vehicle 2:"
                type="text"
                placeholder="Enter Vehicle 2"
                readOnly
                onClick={() => {
                  setIsMakeModelOpen(true)
                  setActiveField('vehicle2')
                }}
                style={{ cursor: 'pointer' }}
                {...form.getInputProps('vehicle2')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <CustomButton
                color='#1B84FF'
                fullWidth
                type='submit'
                loading={isLoading}
              >
                {comparison ? "Update Comparison" : "Add Comparison"}
              </CustomButton>
            </Grid.Col>
          </Grid>
        </form>
      </CustomModal>
      <MakeModelVariantModel
        isOpen={isMakeModelOpen}
        setOnClose={() => setIsMakeModelOpen(false)}
        onSelect={handleMakeModelSelect}
        setOpened={setIsMakeModelOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={() => setIsMakeModelOpen(false)}
        type={form.values.type}
      />
    </>
  );
}
