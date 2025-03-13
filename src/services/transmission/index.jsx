import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const transmissionAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getTransmissions: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.TRANSMISSION}`,
        method: 'GET',
        params,
      }),
      providesTags: ['TRANSMISSIONS'],
    }),
    getTransmissionsByType: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.TRANSMISSION}/type`,
        method: 'GET',
        params,
      }),
    }),

    updateTransmission: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.TRANSMISSION}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    deleteTransmission: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.TRANSMISSION}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    addTransmission: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.TRANSMISSION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    deleteBulkTransmission: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.TRANSMISSION_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['TRANSMISSIONS'],
    }),
  }),
});

export const {
  useGetTransmissionsQuery,
  useGetTransmissionsByTypeQuery,
  useAddTransmissionMutation,
  useUpdateTransmissionMutation,
  useDeleteTransmissionMutation,
  useDeleteBulkTransmissionMutation,
} = transmissionAPIs; 