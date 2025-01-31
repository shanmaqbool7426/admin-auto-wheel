import { Grid, TextInput, NumberInput, Select, Modal, Box } from '@mantine/core';
import { memo, useState, Suspense } from 'react';
import { useGetMakesQuery, useGetModelsQuery, useGetVariantsQuery } from '@/services/make';
// import { AddNewMakeModel } from '@/components/AddNewMakeModel';
import MakeModelVariantModel from '@/components/MakeModelVariantModel';

export const BasicInformation = memo(({ form, isModelOpen, setIsModelOpen }) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Fetch data using RTK Query
  const { data: makes = [], isLoading: isLoadingMakes } = useGetMakesQuery();
  const { data: models = [], isLoading: isLoadingModels } = useGetModelsQuery(selectedMake, {
    skip: !selectedMake,
  });
  const { data: variants = [], isLoading: isLoadingVariants } = useGetVariantsQuery(
    { make: selectedMake, model: selectedModel },
    { skip: !selectedMake || !selectedModel }
  );

  // Current year for the year dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleMakeChange = (value) => {
    setIsModelOpen(true)
    form.setFieldValue('make', value);
    setSelectedMake(value);
    form.setFieldValue('model', '');
    form.setFieldValue('variant', '');
    setSelectedModel('');
  };

  const handleModelChange = (value) => {
    form.setFieldValue('model', value);
    setSelectedModel(value);
    form.setFieldValue('variant', '');
  };

  // HANDLE MODEL OPEN
  const handleModelOpen = (event) => {
    // Prevent the default select dropdown behavior when clicking the add button
    event.preventDefault();
    event.stopPropagation();
    setIsModelOpen(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box>
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
              {...form.getInputProps('type')}
            />
          </Grid.Col>

          {/* Make */}
          <Grid.Col span={4}>
            <TextInput
              onClick={(event)=>handleMakeOpen(event)}
              placeholder="Select make"
              required
              // daa={makes.map(make => ({ value: make.id, label: make.name }))}
              {...form.getInputProps('make')}
              onChange={handleMakeChange}
              loading={isLoadingMakes}
            />
          </Grid.Col>

          {/* Model */}
          <Grid.Col span={4}>
            <Select
              label="Model"
              placeholder="Select model"
              onClick={handleModelOpen}
              data={models.map(model => ({ value: model.id, label: model.name }))}
              {...form.getInputProps('model')}
              onChange={handleModelChange}
              disabled={!selectedMake}
              loading={isLoadingModels}
            />
          </Grid.Col>

          {/* Variant */}
          <Grid.Col span={4}>
            <Select
              label="Variant"
              placeholder="Select variant"
              onClick={handleModelOpen}

              required
              data={variants.map(variant => ({ value: variant.id, label: variant.name }))}
              {...form.getInputProps('variant')}
              disabled={!selectedModel}
              loading={isLoadingVariants}
            />
          </Grid.Col>

          {/* Year */}
          <Grid.Col span={4}>
            <Select
              label="Year"
              placeholder="Select year"
              required
              data={years.map(year => ({ value: year, label: year.toString() }))}
              {...form.getInputProps('year')}
            />
          </Grid.Col>

          {/* Body Type */}
          <Grid.Col span={4}>
            <Select
              label="Body Type"
              placeholder="Select body type"
              required
              data={getBodyTypesByVehicleType(form.values.type)}
              {...form.getInputProps('bodyType')}
              disabled={!form.values.type}
            />
          </Grid.Col>
        </Grid>

        {/* Add New Make/Model Modal */}
        <MakeModelVariantModel
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          selection={selection}
          setSelection={setSelection}
          fetchMakesByTypeData={fetchMakesByTypeData}
          hide={hide}
        />
      </Box>
    </Suspense>
  );
});

BasicInformation.displayName = 'BasicInformation';

// Helper function to get body types based on vehicle type
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

