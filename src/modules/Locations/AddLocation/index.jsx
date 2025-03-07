import React, { useEffect } from 'react'
import CustomModal from '@/components/CustomModal'
import useAddLocation from './useAddLocation'
import { Grid } from '@mantine/core'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

export default function AddLocation({ open, setOnClose }) {
  const {
    form,
    handleSubmit,
    isLoading,
    locations
  } = useAddLocation(setOnClose);

  useEffect(() => {
    // Debug form values changes
    console.log('Form values updated:', form.values);
  }, [form.values]);

  return (
    <CustomModal
      title="Add Location"
      open={open}
      onClose={() => setOnClose(false)}
    >
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <Grid gutter="30px">
          <Grid.Col span={12}>
            <FormField
              label="Name:"
              type="text"
              placeholder="How to Make the Most of Your Holiday Plan"
              {...form.getInputProps('name')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Type:"
              type="select"
              placeholder="Type"
              data={[
                { value: 'country', label: 'Country' },
                { value: 'province', label: 'Province' },
                { value: 'city', label: 'City' },
                { value: 'suburb', label: 'Suburb' },
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Slug:"
              type="text"
              placeholder="How to Make the Most of Your Holiday Plan"
              {...form.getInputProps('slug')}
            />
          </Grid.Col>
          {/* parent id and parent type */}
          <Grid.Col span={12}>
            <FormField
              label="Parent Type:"
              type="select"
              placeholder="Parent Type"
              data={[
                { value: 'country', label: 'Country' },
                { value: 'province', label: 'Province' },
                { value: 'city', label: 'City' },
                { value: 'suburb', label: 'Suburb' },
              ]}
              {...form.getInputProps('parentType')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FormField
              label="Parent ID:"
              type="select"
              data={locations?.map((location) => ({
                value: location._id,
                label: location.name,
              })) || []}
              placeholder="Parent ID"

              {...form.getInputProps('parentId')}
            />
          </Grid.Col>


          <Grid.Col span={12}>
            <FormField
              type="textarea"
              rows={6}
              {...form.getInputProps('description')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <CustomButton color='#1B84FF' fullWidth type='submit' loading={isLoading}>
              Add Location
            </CustomButton>
          </Grid.Col>

        </Grid>
      </form>
    </CustomModal>
  )
}
