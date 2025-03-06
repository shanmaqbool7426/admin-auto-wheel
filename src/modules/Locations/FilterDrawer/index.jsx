import React, { useState } from 'react';
import { Drawer, Grid, Autocomplete } from '@mantine/core';
import CustomButton from '@/components/CustomButton';
import styles from './FilterDrawer.module.css';
import { Country, State, City } from "country-state-city";

export default function FilterDrawer({ open, onClose, form, handleSubmit }) {

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (value) => {
    form.setFieldValue("country", value); // Update form value
    form.setFieldValue("state", ""); // Clear state field
    form.setFieldValue("city", ""); // Clear city field
    setStates([]);
    setCities([]);

    const selectedCountry = countries.find((country) => country.name === value);
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  };

  const handleStateChange = (value) => {
    form.setFieldValue("state", value); // Update form value
    form.setFieldValue("city", ""); // Clear city field
    setCities([]);

    const selectedState = states.find((state) => state.name === value);
    if (selectedState) {
      const selectedCountry = countries.find(
        (country) => country.name === form.values.country
      );
      if (selectedCountry) {
        setCities(
          City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
        );
      }
    }
  };

  return (
    <Drawer
      title="Filter"
      opened={open}
      onClose={onClose}
      position="right"
      classNames={{
        content: styles.drawerContent,
        title: styles.drawerTitle,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="24px">

          <Grid.Col span={12}>
            <Autocomplete
              label="Country"
              placeholder="Select a country"
              data={countries.map((country) => country.name)}
              value={form.values.country}
              onChange={handleCountryChange}
              error={form.errors.country}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Autocomplete
              label="State"
              placeholder="Select a state"
              data={states.map((state) => state.name)}
              value={form.values.state}
              onChange={(value) => {
                form.setFieldValue("state", value);
                handleStateChange(value);
              }}
              disabled={!form.values.country}
              error={form.errors.state}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Autocomplete
              label="City"
              placeholder="Select a city"
              data={cities.map((city) => city.name)}
              value={form.values.city}
              onChange={(value) => form.setFieldValue("city", value)}
              disabled={!form.values.state}
              error={form.errors.city}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomButton color='#1B84FF' fullWidth type='submit'>
              Apply
            </CustomButton>
          </Grid.Col>

        </Grid>
      </form>
    </Drawer>
  )
}
