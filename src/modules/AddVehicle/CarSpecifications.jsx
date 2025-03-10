import { Box, Grid, Title, NumberInput, TextInput, Select, Switch } from '@mantine/core';
import { memo } from 'react';
import { useAddVehicle } from './useAddVehicle';
import useDrive from '../Drive/useDrive';

export const CarSpecifications = memo(({ form }) => {
  const {transmissions} = useAddVehicle()
  const {drivesData} = useDrive()
  console.log("drivesData....",drivesData);
  return (
    <Box>
      {/* Engine Specifications */}
      <EngineSpecs form={form} />

      {/* Dimensions */}
      <DimensionsSpecs form={form} />

      {/* Transmission */}
      <TransmissionSpecs form={form} transmissions={transmissions} drivesData={drivesData?.data?.drives}/>

      {/* Suspension, Steering & Brakes */}
      <SuspensionSpecs form={form} />

      {/* Wheels & Tyres */}
      <WheelsAndTyresSpecs form={form} />

      {/* Fuel Consumption */}
      <FuelConsumptionSpecs form={form} />

      {/* Safety Features */}
      <SafetySpecs form={form} />

      {/* Exterior Features */}
    
      <ExteriorSpecs form={form} />
      <EntertainmentSpecs form={form} />


      {/* Entertainment Features */}
      {/* <EntertainmentSpecs form={form} /> */}

      {/* Comfort & Convenience Features */}
      <ComfortSpecs form={form} />
    </Box>
  );
});
CarSpecifications.displayName = 'CarSpecifications';

const EngineSpecs = ({ form }) => {
  const engineType = form.values.carSpecs?.engine?.type;
  const isElectric = engineType === 'Electric';

  return (
    <Box mb="xl">
      <Title order={3} mb="md">Engine Specifications</Title>
      <Grid>
        <Grid.Col span={4}>
          <Select
            label="Engine Type"
            required
            data={['Petrol', 'Diesel', 'Hybrid', 'Electric']}
            {...form.getInputProps('carSpecs.engine.type')}
            name="engineType"
          />
        </Grid.Col>

        {!isElectric && (
          <>
            <Grid.Col span={4}>
              <NumberInput
                label="Displacement (cc)"
                required
                placeholder="e.g., 1500"
                min={100}
                max={10000}
                {...form.getInputProps('carSpecs.engine.displacement')}
                name="engineDisplacement"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Horsepower"
                placeholder="e.g., 180 HP @ 6500 RPM"
                {...form.getInputProps('carSpecs.engine.horsepower')}
                name="engineHorsepower"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Torque"
                placeholder="e.g., 177 Nm @ 4500 RPM"
                {...form.getInputProps('carSpecs.engine.torque')}
                name="engineTorque"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Max Speed (km/h)"
                placeholder="e.g., 220"
                {...form.getInputProps('carSpecs.engine.maxSpeed')}
                name="engineMaxSpeed"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Cylinder Configuration"
                placeholder="e.g., In-line 4"
                {...form.getInputProps('carSpecs.engine.cylinderConfiguration')}
                name="engineCylinderConfig"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Compression Ratio"
                placeholder="e.g., 10.5:1"
                {...form.getInputProps('carSpecs.engine.compressionRatio')}
                name="engineCompressionRatio"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <NumberInput
                label="Valves Per Cylinder"
                placeholder="e.g., 4"
                min={2}
                max={6}
                {...form.getInputProps('carSpecs.engine.valvesPerCylinder')}
                name="engineValvesPerCylinder"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Valve Mechanism"
                placeholder="e.g., DOHC 16V"
                {...form.getInputProps('carSpecs.engine.valveMechanism')}
                name="engineValveMechanism"
              />
            </Grid.Col>
          </>
        )}

        {(isElectric || engineType === 'Hybrid') && (
          <>
            <Grid.Col span={4}>
              <TextInput
                label="Battery Type"
                placeholder="e.g., Lithium-ion"
                {...form.getInputProps('carSpecs.engine.batteryType')}
                name="engineBatteryType"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Battery Capacity (kWh)"
                placeholder="e.g., 75 kWh"
                {...form.getInputProps('carSpecs.engine.batteryCapacity')}
                name="engineBatteryCapacity"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Charging Time"
                placeholder="e.g., 8 hours"
                {...form.getInputProps('carSpecs.engine.chargingTime')}
                name="engineChargingTime"
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                label="Range (km)"
                placeholder="e.g., 400 km"
                {...form.getInputProps('carSpecs.engine.range')}
                name="engineRange"
              />
            </Grid.Col>
          </>
        )}
      </Grid>
    </Box>
  );
};
EngineSpecs.displayName = 'EngineSpecs';

const DimensionsSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Dimensions</Title>
    <Grid>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Length (mm)"
          placeholder="e.g., 4500"
          {...form.getInputProps('carSpecs.dimensions.overallLength')}
          name="dimensionsLength"
          value={form.values.carSpecs.dimensions.overallLength}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Width (mm)"
          placeholder="e.g., 1800"
          {...form.getInputProps('carSpecs.dimensions.overallWidth')}
          name="dimensionsWidth"
          value={form.values.carSpecs.dimensions.overallWidth}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Overall Height (mm)"
          placeholder="e.g., 1500"
          {...form.getInputProps('carSpecs.dimensions.overallHeight')}
          name="dimensionsHeight"
          value={form.values.carSpecs.dimensions.overallHeight}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Wheelbase (mm)"
          placeholder="e.g., 2600"
          {...form.getInputProps('carSpecs.dimensions.wheelBase')}
          name="dimensionsWheelbase"
          value={form.values.carSpecs.dimensions.wheelBase}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Ground Clearance (mm)"
          placeholder="e.g., 170"
          {...form.getInputProps('carSpecs.dimensions.groundClearance')}
          name="dimensionsGroundClearance"
          value={form.values.carSpecs.dimensions.groundClearance}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Kerb Weight (kg)"
          placeholder="e.g., 1200"
          {...form.getInputProps('carSpecs.dimensions.kerbWeight')}
          name="dimensionsKerbWeight"
          value={form.values.carSpecs.dimensions.kerbWeight}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Boot Space (L)"
          placeholder="e.g., 400"
          {...form.getInputProps('carSpecs.dimensions.bootSpace')}
          name="dimensionsBootSpace"
          value={form.values.carSpecs.dimensions.bootSpace}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Seating Capacity"
          placeholder="e.g., 5"
          min={1}
          max={9}
          {...form.getInputProps('carSpecs.dimensions.seatingCapacity')}
          name="dimensionsSeatingCapacity"
          value={form.values.carSpecs.dimensions.seatingCapacity}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Number of Doors"
          placeholder="e.g., 4"
          min={2}
          max={5}
          {...form.getInputProps('carSpecs.dimensions.doors')}
          name="dimensionsDoors"
          value={form.values.carSpecs.dimensions.doors}
        />
      </Grid.Col>
    </Grid>
  </Box>
);
DimensionsSpecs.displayName = 'DimensionsSpecs';

const TransmissionSpecs = ({ form, transmissions, drivesData }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Transmission & Drive</Title>
    <Grid>
      <Grid.Col span={6}>
        <Select
          label="Transmission Type"
          {...form.getInputProps('carSpecs.transmission.type')}
          data={transmissions}
          name="transmissionType"
          defaultValue={form.values.carSpecs.transmission.type}
        />
      </Grid.Col>

      {/* Add Drive Type Selection */}
      <Grid.Col span={6}>
        <Select
          label="Drive Type"
          required
            data={drivesData?.map(item => ({ value: item.title, label: item.title }))}
          {...form.getInputProps('carSpecs.drive')}
          name="driveType"
          defaultValue={form.values.carSpecs.drive}
        />
      </Grid.Col>
    </Grid>
  </Box>
);
TransmissionSpecs.displayName = 'TransmissionSpecs';

const SuspensionSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Suspension, Steering & Brakes</Title>
    <Grid>
      <Grid.Col span={6}>
        <TextInput
          label="Steering Type"
          placeholder="e.g., Rack and Pinion"
          {...form.getInputProps('carSpecs.suspensionSteeringBrakes.steeringType')}
          name="steeringType"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Power Assisted"
          placeholder="e.g., Electric Power Steering"
          {...form.getInputProps('carSpecs.suspensionSteeringBrakes.powerAssisted')}
          name="powerAssisted"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Minimum Turning Radius (m)"
          placeholder="e.g., 5.2"
          {...form.getInputProps('carSpecs.suspensionSteeringBrakes.minimumTurningRadius')}
          name="turningRadius"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Front Brakes"
          placeholder="e.g., Ventilated Disc"
          {...form.getInputProps('carSpecs.suspensionSteeringBrakes.frontBrakes')}
          name="frontBrakes"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Rear Brakes"
          placeholder="e.g., Drum"
          {...form.getInputProps('carSpecs.suspensionSteeringBrakes.rearBrakes')}
          name="rearBrakes"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
SuspensionSpecs.displayName = 'SuspensionSpecs';

const WheelsAndTyresSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Wheels & Tyres</Title>
    <Grid>
      <Grid.Col span={6}>
        <TextInput
          label="Wheel Type"
          placeholder="e.g., Alloy"
          {...form.getInputProps('carSpecs.wheelsAndTyres.wheelType')}
          name="wheelType"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Wheel Size"
          placeholder="e.g., 16″"
          {...form.getInputProps('carSpecs.wheelsAndTyres.wheelSize')}
          name="wheelSize"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Tyre Size"
          placeholder="e.g., 195/55/R16"
          {...form.getInputProps('carSpecs.wheelsAndTyres.tyreSize')}
          name="tyreSize"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Spare Tyre"
          placeholder="e.g., Full Size"
          {...form.getInputProps('carSpecs.wheelsAndTyres.spareTyre')}
          name="spareTyre"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Spare Tyre Size"
          placeholder="e.g., 195/55/R16"
          {...form.getInputProps('carSpecs.wheelsAndTyres.spareTyreSize')}
          name="spareTyreSize"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
WheelsAndTyresSpecs.displayName = 'WheelsAndTyresSpecs';

const FuelConsumptionSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Fuel Consumption</Title>
    <Grid>
      <Grid.Col span={4}>
        <TextInput
          label="City Mileage (km/l)"
          placeholder="e.g., 12"
          {...form.getInputProps('carSpecs.fuelConsumption.mileageCity')}
          name="mileageCity"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <TextInput
          label="Highway Mileage (km/l)"
          placeholder="e.g., 16"
          {...form.getInputProps('carSpecs.fuelConsumption.mileageHighway')}
          name="mileageHighway"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Fuel Tank Capacity (L)"
          placeholder="e.g., 45"
          {...form.getInputProps('carSpecs.fuelConsumption.tankCapacity')}
          name="tankCapacity"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
FuelConsumptionSpecs.displayName = 'FuelConsumptionSpecs';

const SafetySpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Safety Features</Title>
    <Grid>
      {/* Numerical Inputs */}
      <Grid.Col span={6}>
        <NumberInput
          label="Number of Airbags"
          placeholder="e.g., 6"
          min={0}
          max={12}
          {...form.getInputProps('carSpecs.safety.airbags')}
          name="safetyAirbags"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Number of Seat Belts"
          placeholder="e.g., 5"
          min={2}
          max={9}
          {...form.getInputProps('carSpecs.safety.seatBelts')}
          name="safetySeatBelts"
        />
      </Grid.Col>

      {/* Boolean Switches */}
      <Grid.Col span={4}>
        <Switch
          label="Immobilizer"
          {...form.getInputProps('carSpecs.safety.immobilizer', { type: 'checkbox' })}
          name="safetyImmobilizer"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Child Lock"
          {...form.getInputProps('carSpecs.safety.childLock', { type: 'checkbox' })}
          name="safetyChildLock"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="ABS (Anti-lock Braking System)"
          {...form.getInputProps('carSpecs.safety.abs', { type: 'checkbox' })}
          name="safetyABS"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Traction Control"
          {...form.getInputProps('carSpecs.safety.tractionControl', { type: 'checkbox' })}
          name="safetyTractionControl"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Vehicle Stability Control"
          {...form.getInputProps('carSpecs.safety.vehicleStabilityControl', { type: 'checkbox' })}
          name="safetyStabilityControl"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Hill Assist"
          {...form.getInputProps('carSpecs.safety.hillAssist', { type: 'checkbox' })}
          name="safetyHillAssist"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Downhill Assist"
          {...form.getInputProps('carSpecs.safety.downHillAssist', { type: 'checkbox' })}
          name="safetyDownhillAssist"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="ISOFIX Anchors"
          {...form.getInputProps('carSpecs.safety.isofixAnchors', { type: 'checkbox' })}
          name="safetyIsofixAnchors"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
SafetySpecs.displayName = 'SafetySpecs';

const ExteriorSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Exterior Features</Title>
    <Grid>
      {/* Boolean Switches - First Row */}
      <Grid.Col span={4}>
        <Switch
          label="Alloy Wheels"
          {...form.getInputProps('carSpecs.exterior.alloyWheels', { type: 'checkbox' })}
          name="exteriorAlloyWheels"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Colored Door Handles"
          {...form.getInputProps('carSpecs.exterior.coloredOutsideDoorHandles', { type: 'checkbox' })}
          name="exteriorColoredHandles"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Side Mirrors with Indicators"
          {...form.getInputProps('carSpecs.exterior.sideMirrorsWithIndicators', { type: 'checkbox' })}
          name="exteriorMirrorIndicators"
        />
      </Grid.Col>

      {/* Boolean Switches - Second Row */}
      <Grid.Col span={4}>
        <Switch
          label="Rear Spoiler"
          {...form.getInputProps('carSpecs.exterior.rearSpoiler', { type: 'checkbox' })}
          name="exteriorRearSpoiler"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Adjustable Headlights"
          {...form.getInputProps('carSpecs.exterior.adjustableHeadlights', { type: 'checkbox' })}
          name="exteriorAdjustableHeadlights"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Fog Lights"
          {...form.getInputProps('carSpecs.exterior.fogLights', { type: 'checkbox' })}
          name="exteriorFogLights"
        />
      </Grid.Col>

      {/* Boolean Switches - Third Row */}
      <Grid.Col span={4}>
        <Switch
          label="Sun Roof"
          {...form.getInputProps('carSpecs.exterior.sunRoof', { type: 'checkbox' })}
          name="exteriorSunRoof"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Moon Roof"
          {...form.getInputProps('carSpecs.exterior.moonRoof', { type: 'checkbox' })}
          name="exteriorMoonRoof"
        />
      </Grid.Col>

      {/* Colors Available - Full Width */}
      {/* <Grid.Col span={12}>
        <Select
          label="Available Colors"
          placeholder="Select available colors"
          data={[
            { value: 'White', label: 'White' },
            { value: 'Black', label: 'Black' },
            { value: 'Silver', label: 'Silver' },
            { value: 'Gray', label: 'Gray' },
            { value: 'Red', label: 'Red' },
            { value: 'Blue', label: 'Blue' },
            { value: 'Green', label: 'Green' },
            { value: 'Brown', label: 'Brown' },
            { value: 'Gold', label: 'Gold' },
            { value: 'Bronze', label: 'Bronze' },
            { value: 'Orange', label: 'Orange' },
            { value: 'Yellow', label: 'Yellow' }
          ]}
          searchable
          clearable
          multiple
          {...form.getInputProps('carSpecs.exterior.colorsAvailable')}
          name="exteriorColors"
        />
      </Grid.Col> */}
    </Grid>
  </Box>
);
ExteriorSpecs.displayName = 'ExteriorSpecs';

const EntertainmentSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Entertainment Features</Title>
    <Grid>
      {/* Display Size Input */}
      <Grid.Col span={12}>
        <TextInput
          label="Display Size"
          placeholder="e.g., 8 inches"
          {...form.getInputProps('carSpecs.entertainment.displaySize')}
          name="entertainmentDisplaySize"
        />
      </Grid.Col>

      {/* Boolean Switches - First Row */}
      <Grid.Col span={4}>
        <Switch
          label="Tachometer"
          {...form.getInputProps('carSpecs.entertainment.tachometer', { type: 'checkbox' })}
          name="entertainmentTachometer"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Multi-Information Display"
          {...form.getInputProps('carSpecs.entertainment.multiInfo', { type: 'checkbox' })}
          name="entertainmentMultiInfo"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="CD/DVD Player"
          {...form.getInputProps('carSpecs.entertainment.cdDvdPlayer', { type: 'checkbox' })}
          name="entertainmentCdDvd"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="AM/FM Radio"
          {...form.getInputProps('carSpecs.entertainment.amfmRadio', { type: 'checkbox' })}
          name="entertainmentAmfmRadio"
        />
      </Grid.Col>
      {/* Rear Speakers */}
      <Grid.Col span={4}>
        <Switch
          label="Rear Speakers"
          {...form.getInputProps('carSpecs.entertainment.rearSpeakers', { type: 'checkbox' })}
          name="entertainmentRearSpeakers"
        />
      </Grid.Col>
      {/* Cassette Player */}
      <Grid.Col span={4}>
        <Switch
          label="Cassette Player"
          {...form.getInputProps('carSpecs.entertainment.cassettePlayer', { type: 'checkbox' })}
          name="entertainmentCassettePlayer"
        />
      </Grid.Col>

      {/* Boolean Switches - Second Row */}
      <Grid.Col span={4}>
        <Switch
          label="USB & AUX Input"
          {...form.getInputProps('carSpecs.entertainment.usbAndAux', { type: 'checkbox' })}
          name="entertainmentUsbAux"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Front Speakers"
          {...form.getInputProps('carSpecs.entertainment.frontSpeakers', { type: 'checkbox' })}
          name="entertainmentFrontSpeakers"
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Switch
          label="Rear Seat Entertainment"
          {...form.getInputProps('carSpecs.entertainment.rearSeatEntertainment', { type: 'checkbox' })}
          name="entertainmentRearSeat"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
EntertainmentSpecs.displayName = 'EntertainmentSpecs';

const ComfortSpecs = ({ form }) => (
  <Box mb="xl">
    <Title order={3} mb="md">Comfort & Convenience Features</Title>
    <Grid>
      {/* Text/Select Inputs */}
      <Grid.Col span={6}>
        <TextInput
          label="Seat Material Type"
          placeholder="e.g., Leather, Fabric"
          {...form.getInputProps('carSpecs.comfort.seatMaterialType')}
          name="comfortSeatMaterial"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Select
          label="Key Type"
          data={['Smart entry', 'Regular key', 'Card key']}
          {...form.getInputProps('carSpecs.comfort.keyType')}
          name="comfortKeyType"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Select
          label="Handbrake Type"
          data={['Center Lever', 'Foot Brake', 'Electronic']}
          {...form.getInputProps('carSpecs.comfort.handbrake')}
          name="comfortHandbrake"
        />
      </Grid.Col>

      {/* Climate Control Group */}
      <Grid.Col span={12}>
        <Title order={6} mb="sm">Climate Control</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Air Conditioning"
          {...form.getInputProps('carSpecs.comfort.ac', { type: 'checkbox' })}
          name="comfortAC"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Climate Control"
          {...form.getInputProps('carSpecs.comfort.climateControl', { type: 'checkbox' })}
          name="comfortClimateControl"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Rear AC Vents"
          {...form.getInputProps('carSpecs.comfort.rearAcVents', { type: 'checkbox' })}
          name="comfortRearAC"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Heater"
          {...form.getInputProps('carSpecs.comfort.heater', { type: 'checkbox' })}
          name="comfortHeater"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Heated Seats"
          {...form.getInputProps('carSpecs.comfort.heatedSeats', { type: 'checkbox' })}
          name="comfortHeatedSeats"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Defogger"
          {...form.getInputProps('carSpecs.comfort.defogger', { type: 'checkbox' })}
          name="comfortDefogger"
        />
      </Grid.Col>

      {/* Seating & Storage */}
      <Grid.Col span={12}>
        <Title order={6} mb="sm">Seating & Storage</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Cool Box"
          {...form.getInputProps('carSpecs.comfort.coolBox', { type: 'checkbox' })}
          name="comfortCoolBox"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Rear Folding Seat"
          {...form.getInputProps('carSpecs.comfort.rearFoldingSeat', { type: 'checkbox' })}
          name="comfortRearFoldingSeat"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Rear Headrest"
          {...form.getInputProps('carSpecs.comfort.rearHeadrest', { type: 'checkbox' })}
          name="comfortRearHeadrest"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Cup Holders"
          {...form.getInputProps('carSpecs.comfort.cupHolders', { type: 'checkbox' })}
          name="comfortCupHolders"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Arm Rest"
          {...form.getInputProps('carSpecs.comfort.armRest', { type: 'checkbox' })}
          name="comfortArmRest"
        />
      </Grid.Col>

      {/* Technology & Controls */}
      <Grid.Col span={12}>
        <Title order={6} mb="sm">Technology & Controls</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Navigation"
          {...form.getInputProps('carSpecs.comfort.navigation', { type: 'checkbox' })}
          name="comfortNavigation"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Front Camera"
          {...form.getInputProps('carSpecs.comfort.frontCamera', { type: 'checkbox' })}
          name="comfortFrontCamera"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Rear Camera"
          {...form.getInputProps('carSpecs.comfort.rearCamera', { type: 'checkbox' })}
          name="comfortRearCamera"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Steering Adjustment"
          {...form.getInputProps('carSpecs.comfort.steeringAdjustment', { type: 'checkbox' })}
          name="comfortSteeringAdjustment"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Steering Switches"
          {...form.getInputProps('carSpecs.comfort.steeringSwitches', { type: 'checkbox' })}
          name="comfortSteeringSwitches"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Cruise Control"
          {...form.getInputProps('carSpecs.comfort.cruiseControl', { type: 'checkbox' })}
          name="comfortCruiseControl"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Driving Modes"
          {...form.getInputProps('carSpecs.comfort.drivingModes', { type: 'checkbox' })}
          name="comfortDrivingModes"
        />
      </Grid.Col>

      {/* Power Features */}
      <Grid.Col span={12}>
        <Title order={6} mb="sm">Power Features</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Keyless Entry"
          {...form.getInputProps('carSpecs.comfort.keylessEntry', { type: 'checkbox' })}
          name="comfortKeylessEntry"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Push Start"
          {...form.getInputProps('carSpecs.comfort.pushStart', { type: 'checkbox' })}
          name="comfortPushStart"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Central Locking"
          {...form.getInputProps('carSpecs.comfort.centralLocking', { type: 'checkbox' })}
          name="comfortCentralLocking"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Power Door Locks"
          {...form.getInputProps('carSpecs.comfort.powerDoorLocks', { type: 'checkbox' })}
          name="comfortPowerDoorLocks"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Power Steering"
          {...form.getInputProps('carSpecs.comfort.powerSteering', { type: 'checkbox' })}
          name="comfortPowerSteering"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Power Windows"
          {...form.getInputProps('carSpecs.comfort.powerWindows', { type: 'checkbox' })}
          name="comfortPowerWindows"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Power Mirrors"
          {...form.getInputProps('carSpecs.comfort.powerMirrors', { type: 'checkbox' })}
          name="comfortPowerMirrors"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Front Power Outlet"
          {...form.getInputProps('carSpecs.comfort.frontPowerOutlet', { type: 'checkbox' })}
          name="comfortFrontPowerOutlet"
        />
      </Grid.Col>

      {/* Additional Features */}
      <Grid.Col span={4}>
        <Switch
          label="Rear Wiper"
          {...form.getInputProps('carSpecs.comfort.rearWiper', { type: 'checkbox' })}
          name="comfortRearWiper"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Switch
          label="Interior Lighting"
          {...form.getInputProps('carSpecs.comfort.interiorLighting', { type: 'checkbox' })}
          name="comfortInteriorLighting"
        />
      </Grid.Col>
    </Grid>
  </Box>
);
ComfortSpecs.displayName = 'ComfortSpecs';

export default CarSpecifications;