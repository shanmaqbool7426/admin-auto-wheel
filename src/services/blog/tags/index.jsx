import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';
// import { END_POINTS } from '@/config/endpoints';

export const tagsAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (params) => ({
        url: END_POINTS.TAGS,
        method: 'GET',
        params,
      }),
      providesTags: ['TAGS'],
    }),

    addTag: builder.mutation({
      query: (data) => ({
        url: END_POINTS.TAGS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TAGS'],
    }),

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.TAGS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TAGS'],
    }),
    // update tag
    updateTag: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${END_POINTS.TAGS}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteMultipleTags: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS.TAGS}/bulk-delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['TAGS'],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useAddTagMutation,
  useDeleteTagMutation,
  useDeleteMultipleTagsMutation,  
  useUpdateTagMutation,
} = tagsAPIs;