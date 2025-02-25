'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Box, Text, Group, Badge, Flex } from '@mantine/core';
import CustomModal from '@/components/CustomModal';
import FormField from '@/components/FormField';
import MakeModelVariantModel from '@/components/MakeModelVariantModel';
import CustomButton from '@/components/CustomButton';
import { IconX, IconTrash } from '@tabler/icons-react';

export default function AddCompetitor({
  title,
  open,
  onClose,
  form,
  handleSubmit,
  isLoading
}) {
  const [isMakeModelOpen, setIsMakeModelOpen] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [selection, setSelection] = useState({
    make: '',
    model: '',
    variant: ''
  });

  const handleFieldClick = (fieldType) => {
    setActiveField(fieldType);
    setIsMakeModelOpen(true);
    setSelection({ make: '', model: '', variant: '' });
  };

  const handleRemoveCompetitor = (indexToRemove) => {
    const updatedCompetitors = form.values.competitors.filter((_, index) => index !== indexToRemove);
    form.setFieldValue('competitors', updatedCompetitors);
  };

  const handleClearCompetitors = () => {
    form.setFieldValue('competitors', []);
  };

  useEffect(() => {
    if (selection.make && selection.model && selection.variant) {
      const selectedVehicle = {
        make: selection.make,
        model: selection.model,
        variant: selection.variant
      };

      if (activeField === 'main') {
        form.setFieldValue('vehicle', selectedVehicle);
      } else if (activeField === 'competitor') {
        const newCompetitors = [...(form.values.competitors || []), selectedVehicle];
        form.setFieldValue('competitors', newCompetitors);
      }
    }
  }, [selection]);

  return (
    <>
      <CustomModal
        title={title}
        open={open}
        onClose={onClose}
        size="xl"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter="lg">
            <Grid.Col span={12}>
              <FormField
                label="Type"
                type="select"
                placeholder="Select vehicle type"
                required
                data={[
                  { value: 'car', label: 'Car' },
                  { value: 'bike', label: 'Bike' },
                  { value: 'truck', label: 'Truck' },
                ]}
                {...form.getInputProps('type')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Box mb="md">
                <Text weight={500}>Main Vehicle</Text>
                  <FormField
                    type="text"
                    value={form.values.vehicle ? `${form.values.vehicle?.make} ${form.values.vehicle?.model} ${form.values.vehicle?.variant}` : '' }
                    placeholder="Select main vehicle"
                    readOnly
                    onClick={() => handleFieldClick('main')}
                    style={{ cursor: 'pointer' }}
                  />
              </Box>
            </Grid.Col>

            <Grid.Col span={12}>
              <Box mb="md">
                <Group justify="space-between" mb="xs">
                  <Text weight={500}>Competitors</Text>
                  {form.values.competitors?.length > 0 && (
                    <CustomButton
                      variant="subtle"
                      color="red"
                      size="xs"
                      leftSection={<IconTrash size={16} />}
                      onClick={handleClearCompetitors}
                    >
                      Clear All
                    </CustomButton>
                  )}
                </Group>
                <Flex gap="xs" wrap="wrap" mb="sm">
                  {form.values.competitors?.map((competitor, index) => (
                    <Badge 
                      key={index}
                      rightSection={
                        <IconX 
                          size={14}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveCompetitor(index)}
                        />
                      }
                    >
                      {competitor.make} {competitor.model} {competitor.variant}
                    </Badge>
                  ))}
                </Flex>
                <FormField
                  type="text"
                  placeholder="Add competitor"
                  readOnly
                  onClick={() => handleFieldClick('competitor')}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            </Grid.Col>

            <Grid.Col span={12}>
              <CustomButton
                fullWidth
                type="submit"
                loading={isLoading}
              >
                {title === "Edit Competitor Set" ? "Update" : "Add"} Competitor Set
              </CustomButton>
            </Grid.Col>
          </Grid>
        </form>
      </CustomModal>

      <MakeModelVariantModel
        isOpen={isMakeModelOpen}
        setOpened={setIsMakeModelOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={() => setIsMakeModelOpen(false)}
        type={form.values.type}
      />
    </>
  );
} 