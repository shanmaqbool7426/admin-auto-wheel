// Bodies Service

import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const bodiesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getBodies: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.BODIES}/${params.type}`,
        method: 'GET',
        params,
      }),
      providesTags: ['BODIES'],
    }),
    // update body
    updateBody: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.BODIES}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['BODIES'],
    }),
    // delete body
    deleteBody: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.BODIES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BODIES'],
    }),

    addBody: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.BODIES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BODIES'],
    }),

    deleteBulkBody: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.BODIES_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['BODIES'],
    }),

  }),
});


export const {
  useGetBodiesQuery,
  useAddBodyMutation,
  useUpdateBodyMutation,
  useDeleteBodyMutation,
  useDeleteBulkBodyMutation,
} = bodiesAPIs;
