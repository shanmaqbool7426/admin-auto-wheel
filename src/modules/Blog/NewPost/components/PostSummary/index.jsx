import React, { useEffect } from 'react';
import { Grid, Text, Tooltip } from '@mantine/core';
import Card from '@/components/Card';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

export default function PostSummary({ form, isEdit, authors = [] }) {
  const isScheduled = form.values.visibility === 'Scheduled';
  const isPublished = form.values.visibility === 'Published';

  // Default authors if none provided
  const defaultAuthors = [
    { value: 'Shan Maqbool', label: 'Shan Maqbool' },
    { value: 'Waqas Afzal', label: 'Waqas Afzal' },
  ];

  const visibilityOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
    { value: 'Scheduled', label: 'Scheduled' },
    ...(isEdit ? [{ value: 'Published', label: 'Published' }] : []),
  ];

  // Handle scheduled date when visibility changes
  useEffect(() => {
    if (!isScheduled) {
      form.setFieldValue('scheduledAt', null);
    } else if (isScheduled && !form.values.scheduledAt) {
      // Set default scheduled time to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      form.setFieldValue('scheduledAt', tomorrow);
    }
  }, [isScheduled]);

  return (
    <Card title={'Summary'}>
      <Grid gutter="20px">
        <Grid.Col span={12}>
          <FormField
            label="Visibility"
            type="select"
            placeholder={isEdit ? "Change visibility" : "Select visibility"}
            data={visibilityOptions}
            {...form.getInputProps('visibility')}
            disabled={isPublished && !isEdit} // Disable if published and not in edit mode
          />
          {isPublished && (
            <Text size="xs" color="dimmed" mt={5}>
              Published on: {new Date(form.values.publishDate).toLocaleDateString()}
            </Text>
          )}
        </Grid.Col>

        {isScheduled && (
          <Grid.Col span={12}>
            <FormField
              label="Schedule Date"
              type="datetime"
              placeholder="Select date and time"
              required={isScheduled}
              {...form.getInputProps('scheduledAt')}
              clearable={false}
              minDate={new Date()}
              error={form.errors.scheduledAt}
              styles={(theme) => ({
                input: {
                  '&:disabled': {
                    backgroundColor: theme.colors.gray[1],
                    color: theme.colors.gray[6],
                  },
                },
              })}
            />
            <Text size="xs" color="dimmed" mt={5}>
              Post will be automatically published at the scheduled time
            </Text>
          </Grid.Col>
        )}

        <Grid.Col span={12}>
          <Tooltip label="URL is generated from the title" position="top-start">
            <div>
              <FormField
                label="URL"
                type="text"
                placeholder="http://example.com/your-post-title"
                {...form.getInputProps('url')}
                readOnly
                styles={{
                  input: {
                    color: '#666',
                    backgroundColor: '#f9f9f9',
                    cursor: 'default',
                  }
                }}
              />
            </div>
          </Tooltip>
          <Text size="xs" color="dimmed" mt={5}>
            URL is automatically generated from the title
          </Text>
        </Grid.Col>

        <Grid.Col span={12}>
          <FormField
            label={
              <Tooltip label="Pin this post to the top of your blog">
                <span>Stick to the top of the blog</span>
              </Tooltip>
            }
            type="checkbox"
            {...form.getInputProps('isSticky', { type: 'checkbox' })}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <FormField
            label={
              <Tooltip label="Post will need approval before publishing">
                <span>Pending review</span>
              </Tooltip>
            }
            type="checkbox"
            {...form.getInputProps('isPending', { type: 'checkbox' })}
            disabled={isPublished}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <FormField
            label="Author"
            type="select"
            placeholder={isEdit ? "Change author" : "Select author"}
            data={authors.length > 0 ? authors : defaultAuthors}
            {...form.getInputProps('author')}
            searchable
            required
            error={form.errors.author}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
}