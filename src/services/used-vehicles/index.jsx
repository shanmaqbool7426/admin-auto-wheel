"use client"
import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

// Used Vehicles APIs
export const usedVehiclesAPIs = BASE_API.injectEndpoints({
    endpoints: (builder) => ({

    // Get list of used vehicles with filters
    getUsedVehicles: builder.query({
      query: (params) => ({
        url: `${END_POINTS.USED_VEHICLES}/admin/vehicles`,
        method: 'GET',
        params,
      }), 
      providesTags: ['USED_VEHICLES'],
    }),

    // Create new vehicle
    createUsedVehicle: builder.mutation({
      query: (data) => ({
            url: `${END_POINTS.USED_VEHICLES}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USED_VEHICLES'],
    }),

   
    // Get vehicles by make
    getVehiclesByMake: builder.query({
      query: (params) => ({
        url: `${END_POINTS.USED_VEHICLES}/make`,
        method: 'GET',
        params,
      }),
      providesTags: ['USED_VEHICLES'],
    }),

    // Update vehicle
    updateUsedVehicle: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.USED_VEHICLES}/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['USED_VEHICLES'],
    }),

    // Update vehicle status
    updateVehicleStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${END_POINTS.USED_VEHICLES}/${id}/update-status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['USED_VEHICLES'],
    }),

    // Delete single vehicle
    deleteUsedVehicle: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.USED_VEHICLES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USED_VEHICLES'],
    }),

    // Bulk delete vehicles
    deleteBulkUsedVehicles: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS.USED_VEHICLES}/admin/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: ['USED_VEHICLES'],
    }),

    // Get vehicle by slug
    getUsedVehicleBySlug: builder.query({
      query: (slug) => `${END_POINTS.USED_VEHICLES}/${slug}`,
      providesTags: ['USED_VEHICLES'],
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
  useUpdateVehicleStatusMutation,
} = usedVehiclesAPIs;
