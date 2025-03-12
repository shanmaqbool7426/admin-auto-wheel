import { Box, Grid, Title, NumberInput, TextInput, Select, Switch } from '@mantine/core';
import { memo } from 'react';

export const TruckSpecifications = memo(({ form }) => {
  console.log("form",form)
  return (
    <Box>
      {/* Engine Specifications */}
      <EngineSpecs form={form} />

      {/* Dimensions & Capacity */}
      <DimensionsSpecs form={form} />

      {/* Transmission & Performance */}
      <TransmissionSpecs form={form} />

      {/* Chassis & Suspension */}
      <ChassisSpecs form={form} />

      {/* Wheels & Tyres */}
      <WheelsAndTyresSpecs form={form} />

      {/* Load & Cargo */}
      <LoadSpecs form={form} />

      {/* Axle Configuration */}
      <AxleSpecs form={form} />

      {/* Cabin Features */}
      <CabinSpecs form={form} />

      {/* Fuel System */}
      <FuelSpecs form={form} />

      {/* Safety Features */}
      <SafetySpecs form={form} />

      {/* Warranty & Certification */}
      <WarrantyAndCertification form={form} />

      {/* Additional Features */}
    </Box>
  );
});

TruckSpecifications.displayName = 'TruckSpecifications';

const EngineSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Engine Specifications</Title>
    <Grid>
      <Grid.Col span={4}>
        <Select
          label="Engine Type"
          required
          data={['Diesel', 'Petrol', 'CNG', 'Electric']}
          {...form.getInputProps('truckSpecs.engine.type')}
          name="engineType"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Displacement (cc)"
          required
          placeholder="e.g., 3000"
          {...form.getInputProps('truckSpecs.engine.displacement')}
          name="engineDisplacement"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Horsepower"
          required
          placeholder="e.g., 150 HP @ 3200 RPM"
          {...form.getInputProps('truckSpecs.engine.horsepower')}
          name="engineHorsepower"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Torque"
          required
          placeholder="e.g., 350 Nm @ 1400 RPM"
          {...form.getInputProps('truckSpecs.engine.torque')}
          name="engineTorque"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Emission Standard"
          placeholder="e.g., Euro 4"
          {...form.getInputProps('truckSpecs.engine.emissionStandard')}
          name="emissionStandard"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Fuel Tank Capacity (L)"
          required
          placeholder="e.g., 200"
          {...form.getInputProps('truckSpecs.engine.fuelTankCapacity')}
          name="fuelTankCapacity"
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const DimensionsSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Dimensions & Capacity</Title>
    <Grid>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Length (mm)"
          required
          placeholder="e.g., 7500"
          {...form.getInputProps('truckSpecs.dimensions.length')}
          name="dimensionsLength"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Width (mm)"
          required
          placeholder="e.g., 2300"
          {...form.getInputProps('truckSpecs.dimensions.width')}
          name="dimensionsWidth"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Height (mm)"
          required
          placeholder="e.g., 2800"
          {...form.getInputProps('truckSpecs.dimensions.height')}
          name="dimensionsHeight"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Wheelbase (mm)"
          required
          placeholder="e.g., 4500"
          {...form.getInputProps('truckSpecs.dimensions.wheelBase')}
          name="wheelBase"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Ground Clearance (mm)"
          required
          placeholder="e.g., 220"
          {...form.getInputProps('truckSpecs.dimensions.groundClearance')}
          name="groundClearance"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Turning Radius (m)"
          required
          placeholder="e.g., 7.5"
          {...form.getInputProps('truckSpecs.dimensions.turningRadius')}
          name="turningRadius"
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const TransmissionSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Transmission & Performance</Title>
    <Grid>
      <Grid.Col span={6}>
        <Select
          label="Transmission Type"
          required
          data={['Manual', 'Automatic', 'AMT']}
          {...form.getInputProps('truckSpecs.transmission.type')}
          name="transmissionType"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Number of Gears"
          required
          placeholder="e.g., 6"
          {...form.getInputProps('truckSpecs.transmission.gears')}
          name="transmissionGears"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Maximum Speed"
          placeholder="e.g., 120 km/h"
          {...form.getInputProps('truckSpecs.performance.maxSpeed')}
          name="maxSpeed"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Gradeability"
          placeholder="e.g., 35%"
          {...form.getInputProps('truckSpecs.performance.gradeability')}
          name="gradeability"
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const ChassisSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Chassis & Suspension</Title>
    <Grid>
      <Grid.Col span={6}>
        <Select
          label="Suspension Type"
          placeholder="Select suspension type"
          required
          data={['Air', 'Leaf Spring', 'Coil']}
          {...form.getInputProps('truckSpecs.chassis.suspensionType.front')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          label="Frame Type"
          required
          data={['Ladder Frame', 'Channel Section', 'Box Section']}
          placeholder="Select frame type"
          {...form.getInputProps('truckSpecs.chassis.frameType')}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Select
          label="Front Suspension"
          required
          data={[
            'Parabolic Leaf Springs',
            'Multi-Leaf Springs',
            'Air Suspension',
            'Independent Suspension'
          ]}
          placeholder="Select front suspension"
          {...form.getInputProps('truckSpecs.chassis.suspensionType.front')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          label="Rear Suspension"
          required
          data={[
            'Parabolic Leaf Springs',
            'Multi-Leaf Springs',
            'Air Suspension',
            'Bogie Suspension'
          ]}
          placeholder="Select rear suspension"
          {...form.getInputProps('truckSpecs.chassis.suspensionType.rear')}
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const WheelsAndTyresSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Wheels & Tyres</Title>
    <Grid>
      <Grid.Col span={4}>
        <NumberInput
          label="Number of Wheels"
          required
          placeholder="e.g., 6"
          {...form.getInputProps('truckSpecs.wheels.count')}
          name="wheelCount"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Tyre Size"
          required
          placeholder="e.g., 295/80 R22.5"
          {...form.getInputProps('truckSpecs.wheels.tyreSize')}
          name="tyreSize"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Select
          label="Wheel Type"
          required
          data={['Steel', 'Alloy']}
          {...form.getInputProps('truckSpecs.wheels.type')}
          name="wheelType"
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const LoadSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Load & Cargo</Title>
    <Grid>
      <Grid.Col span={4}>
        <NumberInput
          label="Gross Vehicle Weight (kg)"
          required
          placeholder="e.g., 16000"
          {...form.getInputProps('truckSpecs.load.gvw')}
          name="grossVehicleWeight"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Payload Capacity (kg)"
          required
          placeholder="e.g., 10000"
          {...form.getInputProps('truckSpecs.load.payload')}
          name="payloadCapacity"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Cargo Body Type"
          required
          placeholder="e.g., Box Body"
          {...form.getInputProps('truckSpecs.load.bodyType')}
          name="cargoBodyType"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Cargo Deck Length (mm)"
          placeholder="e.g., 6000"
          {...form.getInputProps('truckSpecs.load.deckLength')}
          name="cargoDeckLength"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Cargo Deck Width (mm)"
          placeholder="e.g., 2300"
          {...form.getInputProps('truckSpecs.load.deckWidth')}
          name="cargoDeckWidth"
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const AxleSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Axle Configuration</Title>
    <Grid>
      <Grid.Col span={4}>
        <NumberInput
          label="Number of Axles"
          required
          placeholder="e.g., 2"
          min={2}
          max={6}
          {...form.getInputProps('truckSpecs.axleConfiguration.numberOfAxles')}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Select
          label="Wheel Configuration"
          required
          data={['4x2', '6x2', '6x4', '8x2', '8x4']}
          placeholder="Select configuration"
          {...form.getInputProps('truckSpecs.axleConfiguration.wheelConfiguration')}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Max Axle Load"
          required
          placeholder="e.g., 7,100 kg"
          {...form.getInputProps('truckSpecs.axleConfiguration.maxAxleLoad')}
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const CabinSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Cabin Features</Title>
    <Grid>
      <Grid.Col span={6}>
        <Select
          label="Cabin Type"
          required
          data={['Day Cab', 'Sleeper Cab', 'Extended Cab', 'Crew Cab']}
          placeholder="Select cabin type"
          {...form.getInputProps('truckSpecs.cabin.type')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Sleeping Berths"
          placeholder="e.g., 2"
          min={0}
          max={4}
          {...form.getInputProps('truckSpecs.cabin.sleepingBerths')}
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const FuelSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Fuel System</Title>
    <Grid>
      <Grid.Col span={6}>
        <NumberInput
          label="Fuel Tank Capacity (L)"
          required
          placeholder="e.g., 400"
          min={100}
          max={1000}
          {...form.getInputProps('truckSpecs.fuel.tankCapacity')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="AdBlue Capacity (L)"
          placeholder="e.g., 75"
          min={0}
          max={200}
          {...form.getInputProps('truckSpecs.fuel.adBlueCapacity')}
        />
      </Grid.Col>
    </Grid>
  </Box>
);

const SafetySpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Safety Features</Title>
    <Grid>
      <Grid.Col span={4}>
        <Switch
          label="ABS (Anti-lock Braking System)"
          {...form.getInputProps('truckSpecs.safety.abs', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Hill Start Assist"
          {...form.getInputProps('truckSpecs.safety.hillAssist', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Trailer Stability Control"
          {...form.getInputProps('truckSpecs.safety.trailerStabilityControl', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Bull Bar"
          {...form.getInputProps('truckSpecs.safety.bullBar', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Toolbox"
          {...form.getInputProps('truckSpecs.safety.toolbox', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Hydraulic Lift"
          {...form.getInputProps('truckSpecs.safety.hydraulicLift', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="GPS"
          {...form.getInputProps('truckSpecs.safety.gps', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Cruise Control"
          {...form.getInputProps('truckSpecs.safety.cruiseControl', { type: 'checkbox' })}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Reverse Camera"
          {...form.getInputProps('truckSpecs.safety.reverseCamera', { type: 'checkbox' })}
        />
      </Grid.Col>

    </Grid>
    <Select
          label="Braking System"
          required
          data={['Air Brakes', 'Hydraulic Brakes']}
          placeholder="Select braking system"
          {...form.getInputProps('truckSpecs.safety.airBrakeSystem')}
        />
  </Box>
);

const WarrantyAndCertification = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Warranty & Certification</Title>
    <Grid>
      <Grid.Col span={6}>
        <TextInput
          label="Vehicle Warranty"
          required
          placeholder="e.g., 2 years/200,000 km"
          {...form.getInputProps('truckSpecs.warranty.vehicle')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Engine Warranty"
          required
          placeholder="e.g., 3 years/300,000 km"
          {...form.getInputProps('truckSpecs.warranty.engine')}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Select
          label="Emission Standard"
          required
          data={['Euro 3', 'Euro 4', 'Euro 5', 'Euro 6']}
          placeholder="Select emission standard"
          {...form.getInputProps('truckSpecs.certification.emissionStandard')}
        />
      </Grid.Col>
    </Grid>
  </Box>
);

export default TruckSpecifications;
