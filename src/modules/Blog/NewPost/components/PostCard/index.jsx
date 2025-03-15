import React, { useEffect, useState } from 'react';
import { Grid, Group } from '@mantine/core';
import Card from '@/components/Card';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import TextEditor from '@/components/TextEditor';
import { generateSlug } from '@/utils/helpers';
import Output from 'editorjs-react-renderer';

export default function PostCard({ form, isLoading, isEdit }) {
  const [content, setContent] = useState(null);

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

  const handleEditorChange = (data) => {
    setContent(data);
    form.setValues({
      content: data
    });
    
  };

  const handleSubmit = () => {
    form.setFieldValue('content', content);
    // ... rest of your form data
  };
  // Custom config if needed
  const config = {
    code: {
      disableDefaultStyle: true,
    }
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
          { <TextEditor 
            data={form.values.content} 
            onChange={handleEditorChange}
          />}
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