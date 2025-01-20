import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';


export const newVehiclesAPIs = BASE_API.injectEndpoints({
    endpoints: (builder) => ({
  
    // Get list of new vehicles with filters
    getNewVehicles: builder.query({
      query: (params) => ({
        url: `${END_POINTS.NEW_VEHICLES}`,
        method: 'GET',
        params,
      }),
      providesTags: ['NewVehicles'],
    }),

    // Create new vehicle
    createNewVehicle: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.NEW_VEHICLES}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['NewVehicles'],
    }),

    // Get popular vehicles by reviews
    getPopularVehiclesByReviews: builder.query({
      query: () => `${END_POINTS.NEW_VEHICLES}/get-popular-by-reviews-vehicles`,
      providesTags: ['NewVehicles'],
    }),

    // Get popular vehicles
    getPopularVehicles: builder.query({
      query: () => `${END_POINTS.NEW_VEHICLES}/popular`,
      providesTags: ['NewVehicles'],
    }),

    // Get top comparison vehicles
    getTopComparisonVehicles: builder.query({
      query: () => `${END_POINTS.NEW_VEHICLES}/comparison`,
      providesTags: ['NewVehicles'],
    }),

    // Get comparison between vehicles
    getComparison: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.NEW_VEHICLES}/compare`,
        method: 'POST',
        body: data,
      }),
    }),

    // Get vehicles listing
    getVehiclesListing: builder.query({
      query: (path) => `${END_POINTS.NEW_VEHICLES}/vehicles-listing/${path}`,
      providesTags: ['NewVehicles'],
    }),

    // Get newly launched vehicles
    getNewlyLaunchedVehicles: builder.query({
      query: () => `${END_POINTS.NEW_VEHICLES}/newly-launched`,
      providesTags: ['NewVehicles'],
    }),

    // Get upcoming vehicles
    getUpcomingVehicles: builder.query({
      query: () => `${END_POINTS.NEW_VEHICLES}/upcoming`,
      providesTags: ['NewVehicles'],
    }),

    // Get similar vehicles
    getSimilarVehicles: builder.query({
      query: (vehicleId) => `${END_POINTS.NEW_VEHICLES}/similar/${vehicleId}`,
      providesTags: ['NewVehicles'],
    }),

    // Get vehicles by make
    getVehiclesByMake: builder.query({
      query: (params) => ({
        url: `${END_POINTS.NEW_VEHICLES}/make`,
        method: 'GET',
        params,
      }),
      providesTags: ['NewVehicles'],
    }),

    // Update vehicle
    updateNewVehicle: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.NEW_VEHICLES}/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['NewVehicles'],
    }),

    // Delete single vehicle
    deleteNewVehicle: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.NEW_VEHICLES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NewVehicles'],
    }),

    // Bulk delete vehicles
    deleteBulkNewVehicles: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS.NEW_VEHICLES}/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: ['NewVehicles'],
    }),

    // Get vehicle by slug
    getNewVehicleBySlug: builder.query({
      query: (slug) => `${END_POINTS.NEW_VEHICLES}/${slug}`,
      providesTags: ['NewVehicles'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetNewVehiclesQuery,
  useCreateNewVehicleMutation,
  useGetPopularVehiclesByReviewsQuery,
  useGetPopularVehiclesQuery,
  useGetTopComparisonVehiclesQuery,
  useGetComparisonMutation,
  useGetVehiclesListingQuery,
  useGetNewlyLaunchedVehiclesQuery,
  useGetUpcomingVehiclesQuery,
  useGetSimilarVehiclesQuery,
  useGetVehiclesByMakeQuery,
  useUpdateNewVehicleMutation,
  useDeleteNewVehicleMutation,
  useDeleteBulkNewVehiclesMutation,
  useGetNewVehicleBySlugQuery,
} = newVehiclesAPIs;
