import React, { useEffect } from 'react';
import { Grid, Box, MultiSelect, TagsInput } from '@mantine/core';
import Card from '@/components/Card';
import FormField from '@/components/FormField';
import styles from './PostCategories.module.css';

export default function PostCategories({ form, categoriesData, tagsData, isEdit }) {

  // Initialize categories and tags when editing
  // useEffect(() => {
  //   if (isEdit && form.values) {
  //     // Ensure categories are properly set
  //     const initialCategories = form.values.categories?.map(catId => {
  //       const category = categoriesData?.find(c => c._id === catId);
  //       return category ? category._id : null;
  //     }).filter(Boolean);

  //     // Ensure tags are properly set
  //     const initialTags = form.values.tags?.map(tagId => {
  //       const tag = tagsData?.find(t => t._id === tagId);
  //       return tag ? tag.name : null;
  //     }).filter(Boolean);

  //     form.setFieldValue('categories', initialCategories);
  //     handleTagChange(initialTags);
  //   }
  // }, [isEdit, categoriesData, tagsData]);

  // // Convert IDs to labels for display
  // const getTagLabels = () => {
  //   return form.values.tags.map(tagId => {
  //     const tag = tagsData?.find(t => t._id === tagId);
  //     return tag ? tag.name : tagId;
  //   }).filter(Boolean);
  // };

  // Handle tag changes to store IDs
  // const handleTagChange = (newTagLabels) => {
  //   const formattedTags = newTagLabels.map(tagLabel => {
  //     const existingTag = tagsData?.find(t => t.name === tagLabel);
  //     return existingTag ? existingTag._id : tagLabel;
  //   });
  //   form.setFieldValue('tags', formattedTags);
  // };

  // Handle new tag creation
  // const handleCreateTag = (query) => {
  //   // You might want to add API call here to create new tag
  //   console.log('Creating new tag:', query);
  //   return query;
  // };

  return (
    <Card title={'Categories'}>
      <Grid gutter="20px">
        <Grid.Col span={12}>
          <FormField
            label="Categories"
            placeholder={"Select Categories"}
            data={categoriesData}
            type="multiselect"
            nothingFoundMessage="Nothing found..."
            searchable
            clearable
            {...form.getInputProps('categories')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FormField
            label="Tags"
             type="multiselect"
            placeholder={"Enter tag and press enter"}
            data={tagsData}
            nothingFoundMessage="Nothing found..."
            searchable
            clearable
            {...form.getInputProps('tags')}
            // splitChars={[',', ' ', 'Enter']}
            // acceptValueOnBlur
            // maxTags={10}
          />
        </Grid.Col>
        {/* <Grid.Col span={12}>
          <FormField
            label="Categories"
            type="select"
            placeholder={isEdit ? "Edit categories" : "Select Categories"}
            data={categoriesData}
            required
            multiple
            searchable
            clearable
            {...form.getInputProps('categories')}
            styles={{
              input: {
                minHeight: '38px',
                border: '1px solid #E9ECEF',
                borderRadius: '4px',
                '&:focus': {
                  borderColor: '#1B84FF',
                },
              },
              invalid: {
                borderColor: 'red',
              }
            }}
          />
          {form.errors.categories && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.errors.categories}
            </div>
          )}
        </Grid.Col> */}

        {/* <Grid.Col span={12}>
          <TagsInput
            label="Tags"
            placeholder={isEdit ? "Edit or add new tags" : "Enter tag and press enter"}
            data={tagsData}
            {...form.getInputProps('tags')}
            // value={getTagLabels()}
            // onChange={handleTagChange}
            splitChars={[',', ' ', 'Enter']}
            acceptValueOnBlur
            maxTags={10}
            clearable
            searchable
            creatable
            getCreateLabel={(query) => `+ Create "${query}"`}
            // onCreate={handleCreateTag}
            styles={{
              input: {
                minHeight: '38px',
                border: '1px solid #E9ECEF',
                borderRadius: '4px',
                '&:focus': {
                  borderColor: '#1B84FF',
                },
              },
              tag: {
                backgroundColor: '#F1F3F5',
                color: '#000',
                '&[data-disabled]': { backgroundColor: '#F1F3F5' },
              },
              invalid: {
                borderColor: 'red',
              }
            }}
          />
          <Box mt={5} sx={{ fontSize: '12px', color: 'gray' }}>
            Press Enter or comma to add tags. Maximum 10 tags allowed.
          </Box>
        </Grid.Col> */}
      </Grid>
    </Card>
  );
}