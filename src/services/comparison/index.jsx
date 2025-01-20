// services/comparison/index.jsx

import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const comparisonAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getComparisonSets: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.COMPARISON}/list`,
        method: 'GET',
        params,
      }),
      providesTags: ['COMPARISON'],
    }),

      addComparisonSet: builder.mutation({
        query: (body) => ({
          url: `${END_POINTS?.COMPARISON}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['COMPARISON'],
      }),

      updateComparisonSet: builder.mutation({
        query: ({ id, data }) => ({
          url: `${END_POINTS?.COMPARISON}/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['COMPARISON'],
      }),

    deleteComparisonSet: builder.mutation({
      query(id) {
        return {
          url: `${END_POINTS?.COMPARISON}/${id}`,
          method: 'DELETE'
          // body: { ids: ids },
        };
      },
        invalidatesTags: ['COMPARISON'],
    }),

    // for models
      addComparisonVehicle: builder.mutation({
        query: ({ makeId, name }) => ({
        url: `${END_POINTS?.COMPARISON}/${makeId}/models`,
        method: 'POST',
        body: { name }
      }),
       invalidatesTags: ['COMPARISON']
    }),
    // update model
    updateComparisonVehicle: builder.mutation({
      query: ({ id, makeId, data }) => ({
        url: `${END_POINTS?.COMPARISON}/${makeId}/models/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['COMPARISON'],
    }),


  }),
});


export const {
  useGetComparisonSetsQuery,
  useUpdateComparisonSetMutation,
  useAddComparisonSetMutation,
  useDeleteComparisonSetMutation,
  useAddComparisonVehicleMutation,
  useUpdateComparisonVehicleMutation,

} = comparisonAPIs;
