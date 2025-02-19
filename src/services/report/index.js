import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const reportAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: (params) => ({
        url: END_POINTS?.REPORTS,
        method: 'GET',
        params,
      }),
      providesTags: ['REPORTS'],
    }),

    getReportsByVehicle: builder.query({
      query: (vehicleId) => ({
        url: `${END_POINTS?.REPORTS}/vehicle/${vehicleId}`,
        method: 'GET',
      }),
      providesTags: ['REPORTS'],
    }),

    getReportsStats: builder.query({
      query: () => ({
        url: `${END_POINTS?.REPORTS}/stats`,
        method: 'GET',
      }),
      providesTags: ['REPORTS'],
    }),

    createReport: builder.mutation({
      query: (body) => ({
        url: END_POINTS?.REPORTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['REPORTS'],
    }),

    updateReportStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${END_POINTS?.REPORTS}/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['REPORTS'],
    }),

    deleteReport: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.REPORTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['REPORTS'],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetReportsByVehicleQuery,
  useGetReportsStatsQuery,
  useCreateReportMutation,
  useUpdateReportStatusMutation,
  useDeleteReportMutation,
} = reportAPIs;
