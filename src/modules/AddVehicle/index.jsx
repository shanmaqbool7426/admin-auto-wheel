"use client"
import { Box, Paper, Title, Tabs, Button, LoadingOverlay, Grid, Select, TextInput, Alert } from '@mantine/core';
import { memo, useEffect, useState } from 'react';
import { useAddVehicle } from './useAddVehicle';
import MakeModelVariantModel from '@/components/MakeModelVariantModel';
import { CarSpecifications } from './CarSpecifications';
import BikeSpecifications from './BikeSpecifications';
import { TruckSpecifications } from './TruckSpecifications';
import { GeneralInformation } from './GeneralInformation';
import useMakes from '../Makes/useMakes';

const AddVehicle = memo(({ editData, type }) => {
  const { form, handleSubmit, isLoading, isSubmitting, bodyData, error, colors } = useAddVehicle(editData?.data, type);
  const { makesData } = useMakes();
  const [activeTab, setActiveTab] = useState('basic');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selection, setSelection] = useState({
    make: editData?.data?.info?.make || '',
    model: editData?.data?.info?.model || '',
    variant: editData?.data?.info?.variant || ''
  });


  // Current year for the year dropdown
  const currentYear = new Date().getFullYear()+2;
  const years = Array.from({ length: 30 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString()
  }));

  const vehicleType = form.values.type;

  // Validate current tab fields
  const validateCurrentTab = () => {
    const tabValidation = {
      basic: ['type', 'make', 'model', 'variant', 'year', 'bodyType'],
      general: ['minPrice', 'maxPrice', 'description', 'defaultImage'],
      specifications: [],
    };

    const currentTabFields = tabValidation[activeTab] || [];
    const errors = currentTabFields.reduce((acc, field) => {
      const error = form.validateField(field);
      if (error) acc[field] = error;
      return acc;
    }, {});
    console.log('errors', errors);

    return  Object.values(errors).filter(item => item.hasError === true).length=== 0;
  };

  console.log('formdata', form.values);

  const handleNextClick = () => {
    if (true) {
      const tabOrder = ['basic', 'general', 'specifications'];
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        setActiveTab(tabOrder[currentIndex + 1]);
      }
    }
  };

  // Get body types based on vehicle type
  const getBodyTypesByVehicleType = (type) => {
    switch (type) {
      case 'car':
        return [
          { value: 'sedan', label: 'Sedan' },
          { value: 'suv', label: 'SUV' },
          { value: 'hatchback', label: 'Hatchback' },
          { value: 'coupe', label: 'Coupe' },
          { value: 'wagon', label: 'Wagon' },
          { value: 'van', label: 'Van' },
          { value: 'convertible', label: 'Convertible' }
        ];
      case 'bike':
        return [
          { value: 'standard', label: 'Standard' },
          { value: 'sports', label: 'Sports' },
          { value: 'cruiser', label: 'Cruiser' },
          { value: 'touring', label: 'Touring' },
          { value: 'scooter', label: 'Scooter' },
          { value: 'offroad', label: 'Off-Road' }
        ];
      case 'truck':
        return [
          { value: 'pickup', label: 'Pickup' },
          { value: 'delivery', label: 'Delivery' },
          { value: 'dump', label: 'Dump Truck' },
          { value: 'tanker', label: 'Tanker' },
          { value: 'box', label: 'Box Truck' },
          { value: 'flatbed', label: 'Flatbed' }
        ];
      default:
        return [];
    }
  };
  const renderSpecifications = () => {
    switch (vehicleType) {
      case 'car':
        return <CarSpecifications form={form} />;
      case 'bike':
        return <BikeSpecifications form={form} />;
      case 'truck':
        return <TruckSpecifications form={form} />;
      default:
        return <Box>Please select a vehicle type first</Box>;
    }
  };

  // Effect to update form when selection changes
  useEffect(() => {
    form.setFieldValue('make', editData?.data?.Info?.make || selection.make);
    form.setFieldValue('model', editData?.data?.Info?.model || selection.model);
    form.setFieldValue('variant', editData?.data?.Info?.variant || selection.variant);
  }, [selection]);


  console.log('form...........', form.values);
  return (
    <Box p="md">
      <Paper shadow="xs" p="md" pos="relative">
        <LoadingOverlay 
          visible={isLoading || isSubmitting} 
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <Title order={2} mb="lg">
          {editData ? 'Edit Vehicle' : 'Add New Vehicle'}
        </Title>

        {error && (
          <Alert color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List mb="md">
              <Tabs.Tab value="basic">Basic Information</Tabs.Tab>
              <Tabs.Tab value="general">General Information</Tabs.Tab>
              <Tabs.Tab value="specifications">Specifications</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic">
              <Grid>
                {/* Vehicle Type */}
                <Grid.Col span={4}>
                  <Select
                    label="Vehicle Type"
                    placeholder="Select vehicle type"
                    required
                    data={[
                      { value: 'car', label: 'Car' },
                      { value: 'bike', label: 'Bike' },
                      { value: 'truck', label: 'Truck' }
                    ]}
                    value={form.values.type}
                    {...form.getInputProps('type')}
                  />
                </Grid.Col>

                {/* Make */}
                <Grid.Col span={4} onClick={() => setIsModelOpen(true)}>
                  <TextInput
                    label="Make"
                    onClick={() => setIsModelOpen(true)}
                    placeholder="Select make"
                    {...form.getInputProps('make')}
                    name="make"
                    value={form.values.make}
                  />
                </Grid.Col>

                {/* Model */}
                <Grid.Col span={4}>
                  <TextInput
                    label="Model"
                    required
                    placeholder="Select model"
                    value={form.values.model}
                    onClick={() => setIsModelOpen(true)}
                    readOnly
                    styles={{ input: { cursor: 'pointer' } }}
                  />
                </Grid.Col>

                {/* Variant */}
                <Grid.Col span={4}>
                  <TextInput
                    label="Variant"
                    required
                    placeholder="Select variant"
                    value={form.values.variant}
                    onClick={() => setIsModelOpen(true)}
                    readOnly
                    styles={{ input: { cursor: 'pointer' } }}
                  />
                </Grid.Col>

                {/* Year */}
                <Grid.Col span={4}>
                  <Select
                    label="Year"
                    placeholder="Select year"
                    {...form.getInputProps('year')}
                    value={`${form.values.year}`}
                    required
                    data={years}
                  />
                </Grid.Col>

                {/* Body Type */}
                <Grid.Col span={4}>
                  <Select
                    label="Body Type"
                    placeholder="Select body type"
                    value={form.values.bodyType}  
                    required
                    data={bodyData}
                    {...form.getInputProps('bodyType')}
                  />
                </Grid.Col>

                {Object.keys(form.errors).length > 0 && (
                  <Grid.Col span={12}>
                    <Alert color="red">
                      Please fix the validation errors before proceeding
                    </Alert>
                  </Grid.Col>
                )}
              </Grid>

              <MakeModelVariantModel
                selection={selection}
                fetchMakesByTypeData={makesData}
                isOpen={isModelOpen}
                setOpened={setIsModelOpen}
                setSelection={setSelection}
                onClose={() => setIsModelOpen(false)}
                type={form.values.type}
              />
            </Tabs.Panel>

            <Tabs.Panel value="general">
              <GeneralInformation form={form} />
            </Tabs.Panel>

            <Tabs.Panel value="specifications">
              {renderSpecifications()}
            </Tabs.Panel>
          </Tabs>

          <Box mt="xl" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {activeTab !== 'basic' && (
              <Button
                variant="default"
                onClick={() => {
                  const tabOrder = ['basic', 'general', 'specifications'];
                  const currentIndex = tabOrder.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabOrder[currentIndex - 1]);
                  }
                }}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}

            {activeTab !== 'specifications' ? (
              <Button
                
                color="blue"
                onClick={handleNextClick}
                loading={isSubmitting}
                disabled={Object.keys(form.errors).length > 0}
              >
                Next
              </Button>
            ) : (
              <Button
                color="green"
                type="submit"
                loading={isSubmitting}
                disabled={Object.keys(form.errors).length > 0}
              >
                {editData ? 'Update Vehicle' : 'Submit Vehicle'}
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
});

AddVehicle.displayName = 'AddVehicle';

export default AddVehicle;