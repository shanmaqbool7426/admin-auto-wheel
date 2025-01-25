"use client"
import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

// Used Vehicles APIs
export const usedVehiclesAPIs = BASE_API.injectEndpoints({
    endpoints: (builder) => ({
  
    // Get list of used vehicles with filters
    getUsedVehicles: builder.query({
      query: (params) => ({
        url: `${END_POINTS.USED_VEHICLES}/vehicles-by-type`,
        method: 'GET',
        params,
      }), 
      providesTags: ['UsedVehicles'],
    }),

    // Create new vehicle
    createUsedVehicle: builder.mutation({
      query: (data) => ({
            url: `${END_POINTS.USED_VEHICLES}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UsedVehicles'],
    }),

   
    // Get vehicles by make
    getVehiclesByMake: builder.query({
      query: (params) => ({
        url: `${END_POINTS.USED_VEHICLES}/make`,
        method: 'GET',
        params,
      }),
      providesTags: ['UsedVehicles'],
    }),

    // Update vehicle
    updateUsedVehicle: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.USED_VEHICLES}/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['UsedVehicles'],
    }),

    // Delete single vehicle
    deleteUsedVehicle: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.USED_VEHICLES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UsedVehicles'],
    }),

    // Bulk delete vehicles
    deleteBulkUsedVehicles: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS.USED_VEHICLES}/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: ['UsedVehicles'],
    }),

    // Get vehicle by slug
    getUsedVehicleBySlug: builder.query({
      query: (slug) => `${END_POINTS.USED_VEHICLES}/${slug}`,
      providesTags: ['UsedVehicles'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUsedVehiclesQuery,
  useCreateUsedVehicleMutation,
  useGetVehiclesByMakeQuery,
  useUpdateUsedVehicleMutation,
  useDeleteUsedVehicleMutation,
  useDeleteBulkUsedVehiclesMutation,
  useGetUsedVehicleBySlugQuery,
} = usedVehiclesAPIs;
