import React from 'react';
import {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  RadioGroup,
  Radio,
  DatePicker,
  Switch,
  PasswordInput,
  NumberInput,
  MultiSelect,
  TagsInput,
  FileInput,
  ColorInput,
} from '@mantine/core';
import styles from './FormField.module.css';
import { IconSelect, IconInputDate } from "@/assets/icons";
import { DateTimePicker } from '@mantine/dates';

export default function FormField(props) {
  const { type, data, options, ...rest } = props;

  const componentMap = {
    'text': () => (
      <TextInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'textarea': () => (
      <Textarea
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'password': () => (
      <PasswordInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'number': () => (
      <NumberInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'select': () => (
      <Select
        {...rest}
        data={data.map(item => ({
          ...item,
          key: item.value
        }))}
        rightSection={<IconSelect />}
        classNames={{
          label: styles.label,
          input: styles.input,
          section: styles.selectSection,
          dropdown: styles.selectDropdown,
          option: styles.selectOption,
        }}
      />
    ),
    'multiselect': () => (
      <MultiSelect
        {...rest}
        data={data}
        // rightSection={<IconSelect />}
        classNames={{
          label: styles.label,
          input: styles.input,
          // section: styles.selectSection,
          dropdown: styles.selectDropdown,
          option: styles.selectOption,
        }}
      />
    ),
    'datetime': () => (
      <DateTimePicker
        rightSection={<IconInputDate />}
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'checkbox': () => (
      <Checkbox
        {...rest}
        radius={3}
        size='16px'
        classNames={{
          label: styles.labelCheckbox,
          icon: styles.iconCheckbox,
        }}
      />
    ),
    'tags': () => (
      <TagsInput
        {...rest}
        data={data}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'color': () => (
      <ColorInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
          ...rest.classNames,
        }}
        format="hex"
      />
    ),
    'switch': () => <Switch {...rest} />,
    'radio': () => <RadioGroup {...rest}>{options.map((option) => (<Radio key={option.value} value={option.value} label={option.label} />))}</RadioGroup>,
    'file': () => <FileInput {...rest} />,
  };

  return componentMap[type]
    ? componentMap[type]()
    : <TextInput
      {...rest}
      classNames={{
        label: styles.label,
        input: styles.input,
      }}
    />;
};
