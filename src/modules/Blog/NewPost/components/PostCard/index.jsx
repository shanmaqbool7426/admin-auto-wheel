import React, { useEffect } from 'react';
import { Grid, Group } from '@mantine/core';
import Card from '@/components/Card';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import TextEditor from '@/components/TextEditor';
import { generateSlug } from '@/utils/helpers';

export default function PostCard({ form, isLoading, isEdit }) {
  useEffect(() => {
    if (!isEdit && form.values.title) {
      const slug = generateSlug(form.values.title);
      form.setFieldValue('url', `http://example.com/${slug}`);
    }
  }, [form.values.title, isEdit]);

  const handleCancel = () => {
    if (form.isDirty() && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    window.history.back(); // or use router.push('/posts')
  };

  return (
    <Card>
      <Grid gutter="30px">
        <Grid.Col span={12}>
          <FormField
            label="Title:"
            type="text"
            placeholder={isEdit ? "Edit post title" : "How to Make the Most of Your Holiday Plan"}
            required
            {...form.getInputProps('title')}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <TextEditor
            content={form.values.content}
            setContent={(value) => form.setFieldValue('content', value)}
            placeholder={isEdit ? "Edit your post content..." : "Write your post content..."}
          />
          {form.errors.content && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.errors.content}
            </div>
          )}
        </Grid.Col>

        <Grid.Col span={12}>
          <Group position="apart">
            <CustomButton
              variant="outline"
              color="gray"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </CustomButton>

            <CustomButton
              color='#1B84FF'
              type='submit'
              loading={isLoading}
            >
              {isLoading
                ? `${isEdit ? 'Updating' : 'Creating'} Post...`
                : `${isEdit ? 'Update' : 'Create'} Post`
              }
            </CustomButton>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
}