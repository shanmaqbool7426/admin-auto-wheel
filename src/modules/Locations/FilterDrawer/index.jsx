import React, { useState } from 'react';
import { Drawer, Grid, Autocomplete } from '@mantine/core';
import CustomButton from '@/components/CustomButton';
import styles from './FilterDrawer.module.css';
import { Country, State, City } from "country-state-city";
import { useGetLocationsQuery, useGetChildrenLocationsQuery } from '@/services/location';

export default function FilterDrawer({ open, onClose, form, handleSubmit }) {

  const [countries] = useState(Country.getAllCountries());
  const { data: locationsData } = useGetLocationsQuery({
    type: "province",
    limit: 1000,
  });
  const { data: childrenLocationsData } = useGetChildrenLocationsQuery("67ca1ef58928ed870d9578eb");

  
  console.log('childrenLocationsData::... ', childrenLocationsData);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (value) => {
    // form.setFieldValue("country", value); // Update form value
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
              label="Province"
              placeholder="Select a province"
              data={locationsData?.data?.locations?.map((location) => location.name)}
              value={form.values.province}
              onChange={(value) => {
                form.setFieldValue("province", value);
                handleStateChange(value);
              }}
              error={form.errors.province}
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
