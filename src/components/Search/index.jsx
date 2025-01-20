'use client'
import React from 'react';
import debounce from 'lodash/debounce';
import { TextInput } from '@mantine/core';
import { IconSearch } from "@/assets/icons";
import classes from './Search.module.css'

export default function Search({ setSearchBy, placeholder = 'Search here' }) {
  const icon = <IconSearch />

  const debouncedSearch = debounce((value, setSearchBy) => {
    setSearchBy(value);
  }, 1000);

  const handleChangeSearch = (event) => {
    const { value } = event?.target;
    debouncedSearch(value, setSearchBy);
  };

  return (
    <TextInput
      onChange={handleChangeSearch}
      placeholder={placeholder}
      leftSection={icon}
      classNames={{
        input: classes.input,
        section: classes.section,
      }}
    />
  )
}
