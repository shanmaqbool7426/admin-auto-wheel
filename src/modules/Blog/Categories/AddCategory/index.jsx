import React from 'react'
import CustomModal from '@/components/CustomModal'
import { Grid } from '@mantine/core'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import useCategories from '../useCategories'

export default function AddCategory({ title, open, onClose, form, handleSubmit, isLoading }) {
  const { categoriesList } = useCategories();

  return (
    <CustomModal
      title={title}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="30px">
          <Grid.Col span={12}>
            <FormField
              label="Name:"
              type="text"
              placeholder="Enter category name"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Slug:"
              type="text"
              placeholder="Enter slug or it will be generated automatically"
              {...form.getInputProps('slug')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Parent Category:"
              type="select"
              placeholder="Select parent category"
              data={categoriesList}
              {...form.getInputProps('parentCategory')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Description:"
              type="textarea"
              placeholder="Enter category description"
              rows={6}
              {...form.getInputProps('description')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <CustomButton
              color='#1B84FF'
              fullWidth
              type='submit'
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading
                ? (title === 'Edit Category' ? 'Updating...' : 'Adding...')
                : (title === 'Edit Category' ? 'Update Category' : 'Add New Category')
              }
            </CustomButton>
          </Grid.Col>
        </Grid>
      </form>
    </CustomModal>
  )
}