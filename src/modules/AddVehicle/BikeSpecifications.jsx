import { Switch } from '@mantine/core';
import { Box, Grid, Title, NumberInput, TextInput, Select, MultiSelect } from '@mantine/core';
import { memo } from 'react';
import {useAddVehicle} from '../AddVehicle/useAddVehicle';

// Define components with proper display names using function declarations
function EngineSpecsComponent({ form }) {

  const { fuelTypes } = useAddVehicle();
  return (
    <Box mb="xl">
      <Title order={3} mb="md">Engine Specifications</Title>
      <Grid>
        <Grid.Col span={4}>
          {/* make select */}
          
          <Select
            label="Engine Type"
            required
            data={fuelTypes}
            placeholder="e.g., 4 Stroke OHC Air Cooled"
            {...form.getInputProps('bikeSpecs.engine.type')}
            name="engineType"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Displacement (cc)"
            required
            placeholder="e.g., 124"
            min={50}
            max={2000}
            {...form.getInputProps('bikeSpecs.engine.displacement')}
            name="engineDisplacement"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Horsepower"
            required
            placeholder="e.g., 10.7 HP @ 7500 RPM"
            {...form.getInputProps('bikeSpecs.engine.horsepower')}
            name="engineHorsepower"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Torque"
            required
            placeholder="e.g., 10.4 Nm @ 6500 RPM"
            {...form.getInputProps('bikeSpecs.engine.torque')}
            name="engineTorque"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Bore & Stroke"
            required
            placeholder="e.g., 54.0 x 54.0 mm"
            {...form.getInputProps('bikeSpecs.engine.boreStroke')}
            name="engineBoreStroke"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Compression Ratio"
            required
            placeholder="e.g., 10.0:1"
            {...form.getInputProps('bikeSpecs.engine.compressionRatio')}
            name="engineCompressionRatio"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Clutch"
            required
            placeholder="e.g., Wet Type Multi-Plate"
            {...form.getInputProps('bikeSpecs.engine.clutch')}
            name="engineClutch"
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
EngineSpecsComponent.displayName = 'EngineSpecsComponent';
const EngineSpecs = memo(EngineSpecsComponent);

function PerformanceSpecsComponent({ form }) {
  return (
    <Box mb="xl">
      <Title order={3} mb="md">Performance & Transmission</Title>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="Starting System"
            required
            placeholder="e.g., Kick & Electric Start"
            {...form.getInputProps('bikeSpecs.starting')}
            name="startingSystem"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Transmission"
            required
            placeholder="e.g., 5-speed"
            {...form.getInputProps('bikeSpecs.transmission')}
            name="transmission"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Fuel Capacity (L)"
            required
            placeholder="e.g., 13"
            min={1}
            max={50}
            {...form.getInputProps('bikeSpecs.fuelCapacity')}
            name="fuelCapacity"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Fuel Average"
            required
            placeholder="e.g., 45.0 KM/L"
            {...form.getInputProps('bikeSpecs.fuelAverage')}
            name="fuelAverage"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Top Speed"
            required
            placeholder="e.g., 100 KM/H"
            {...form.getInputProps('bikeSpecs.topSpeed')}
            name="topSpeed"
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
PerformanceSpecsComponent.displayName = 'PerformanceSpecsComponent';
const PerformanceSpecs = memo(PerformanceSpecsComponent);

function DimensionsSpecsComponent({ form }) {
  return (
    <Box mb="xl">
      <Title order={3} mb="md">Dimensions</Title>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="Overall Length"
            required
            placeholder="e.g., 1975 mm"
            {...form.getInputProps('bikeSpecs.dimensions.length')}
            name="dimensionsLength"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Overall Width"
            required
            placeholder="e.g., 745 mm"
            {...form.getInputProps('bikeSpecs.dimensions.width')}
            name="dimensionsWidth"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Overall Height"
            required
            placeholder="e.g., 1080 mm"
            {...form.getInputProps('bikeSpecs.dimensions.height')}
            name="dimensionsHeight"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Dry Weight (KG)"
            required
            placeholder="e.g., 114"
            min={50}
            max={500}
            {...form.getInputProps('bikeSpecs.dryWeight')}
            name="dryWeight"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Ground Clearance"
            required
            placeholder="e.g., 145 mm"
            {...form.getInputProps('bikeSpecs.groundClearance')}
            name="groundClearance"
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
DimensionsSpecsComponent.displayName = 'DimensionsSpecsComponent';
const DimensionsSpecs = memo(DimensionsSpecsComponent);

function ChassisSpecsComponent({ form }) {
  return (
    <Box mb="xl">
      <Title order={3} mb="md">Chassis & Suspension</Title>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Frame Type"
            required
            placeholder="e.g., Backbone Type"
            {...form.getInputProps('bikeSpecs.frame')}
            name="frameType"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Suspension Type"
            placeholder="e.g., Telescopic Fork"
            {...form.getInputProps('bikeSpecs.suspension')}
            name="suspensionType"
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
ChassisSpecsComponent.displayName = 'ChassisSpecsComponent';
const ChassisSpecs = memo(ChassisSpecsComponent);

function WheelsAndTyresSpecsComponent({ form }) {
  return (
    <Box mb="xl">
      <Title order={3} mb="md">Wheels & Tyres</Title>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="Wheel Size"
            required
            placeholder="e.g., 18 in"
            {...form.getInputProps('bikeSpecs.wheelSize')}
            name="wheelSize"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Front Tyre"
            required
            placeholder="e.g., 2.75 - 18"
            {...form.getInputProps('bikeSpecs.tyres.front')}
            name="frontTyre"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Back Tyre"
            required
            placeholder="e.g., 3.50 - 18"
            {...form.getInputProps('bikeSpecs.tyres.back')}
            name="backTyre"
          />
        </Grid.Col>
        {/* <Grid.Col span={12}>
          <MultiSelect
            label="Available Colors"
            placeholder="Select available colors"
            data={[
              'Red',
              'Black',
              'Blue',
              'Silver',
              'White',
              'Green',
              'Yellow',
              'Orange',
              'Brown',
              'Grey'
            ]}
            searchable
            clearable
            {...form.getInputProps('bikeSpecs.colorsAvailable')}
            name="colorsAvailable"
          />
        </Grid.Col> */}
      </Grid>
    </Box>
  );
}
// safty  select for [Air Brakes, Hydraulic Brakes]
function SafetyComponent({ form }) {
  console.log("form>>>>>", { ...form.getInputProps('bikeSpecs.safety.discBrake') })
  return (
    <Box>
      <Title order={3} mb="md">Safety</Title>
      <Grid>
        {/* // use switchbox for features  Anti Theft Lock, Disc Brake, Led Light, Wind Shield */}
        <Grid.Col span={4}>
          <Switch
            label="Anti Theft Lock"
            {...form.getInputProps('bikeSpecs.safety.antiTheftLock')}
            name="antiTheftLock"
            checked={form.values.bikeSpecs.safety.antiTheftLock}

          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Switch
            label="Disc Brake"
            {...form.getInputProps('bikeSpecs.safety.discBrake')}
            checked={form.values.bikeSpecs.safety.discBrake}
            name="discBrake"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Switch
            label="Led Light"
            checked={form.values.bikeSpecs.safety.ledLight}
            {...form.getInputProps('bikeSpecs.safety.ledLight')}
            name="ledLight"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Switch
            label="Wind Shield"
            checked={form.values.bikeSpecs.safety.windShield}

            {...form.getInputProps('bikeSpecs.safety.windShield')}
            name="windShield"
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}
SafetyComponent.displayName = 'SafetyComponent';


WheelsAndTyresSpecsComponent.displayName = 'WheelsAndTyresSpecsComponent';
const WheelsAndTyresSpecs = memo(WheelsAndTyresSpecsComponent);

function BikeSpecificationsComponent({ form }) {
  return (
    <Box>
      <EngineSpecs form={form} />
      <PerformanceSpecs form={form} />
      <DimensionsSpecs form={form} />
      <ChassisSpecs form={form} />
      <WheelsAndTyresSpecs form={form} />
      {/* safty */}
      <SafetyComponent form={form} />

    </Box>
  );
}
BikeSpecificationsComponent.displayName = 'BikeSpecificationsComponent';

// Export the memoized component
export default memo(BikeSpecificationsComponent);