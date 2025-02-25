import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const competitorAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitors: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.COMPETITOR}/list`,
        method: 'GET',
        params,
      }),
      providesTags: ['COMPETITOR'],
    }),

    addCompetitor: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.COMPETITOR}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['COMPETITOR'],
    }),

    updateCompetitor: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.COMPETITOR}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['COMPETITOR'],
    }),

    deleteCompetitor: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.COMPETITOR}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COMPETITOR'],
    }),

    deleteBulkCompetitors: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS?.COMPETITOR}/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: ['COMPETITOR'],
    }),
  }),
});

export const {
  useGetCompetitorsQuery,
  useAddCompetitorMutation,
  useUpdateCompetitorMutation,
  useDeleteCompetitorMutation,
  useDeleteBulkCompetitorsMutation,
} = competitorAPIs; 