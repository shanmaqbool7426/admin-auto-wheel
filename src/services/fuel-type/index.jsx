import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const fuelTypeAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFuelTypes: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.FUEL_TYPE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['FUEL_TYPES'],
    }),

    updateFuelType: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.FUEL_TYPE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    deleteFuelType: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.FUEL_TYPE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    addFuelType: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.FUEL_TYPE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    deleteBulkFuelType: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.FUEL_TYPE_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['FUEL_TYPES'],
    }),
  }),
});

export const {
  useGetFuelTypesQuery,
  useAddFuelTypeMutation,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation,
  useDeleteBulkFuelTypeMutation,
} = fuelTypeAPIs;