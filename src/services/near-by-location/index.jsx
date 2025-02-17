// Nearby Location Service

import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const nearbyLocationAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getNearbyLocations: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.NEAR_BY_LOCATION}`,
        method: 'GET',
        params,
      }),
      providesTags: ['NEAR_BY_LOCATION'],
    }),
    updateNearbyLocation: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.NEAR_BY_LOCATION}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['NEAR_BY_LOCATION'],
    }),
    deleteNearbyLocation: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.NEAR_BY_LOCATION}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NEAR_BY_LOCATION'],
    }),

    addNearbyLocation: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.NEAR_BY_LOCATION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['NEAR_BY_LOCATION'],
    }),

    deleteBulkNearbyLocation: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.NEAR_BY_LOCATION_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['NEAR_BY_LOCATION'],
    }),

  }),
});


export const {
  useGetNearbyLocationsQuery,
  useAddNearbyLocationMutation,
  useUpdateNearbyLocationMutation,
  useDeleteNearbyLocationMutation,
  useDeleteBulkNearbyLocationMutation,
} = nearbyLocationAPIs;
