import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const driveAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getDrives: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.DRIVE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['DRIVES'],
    }),

    updateDrive: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.DRIVE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['DRIVES'],
    }),

    deleteDrive: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.DRIVE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DRIVES'],
    }),

    addDrive: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.DRIVE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DRIVES'],
    }),

    deleteBulkDrive: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.DRIVE_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['DRIVES'],
    }),
  }),
});

export const {
  useGetDrivesQuery,
  useAddDriveMutation,
  useUpdateDriveMutation,
  useDeleteDriveMutation,
  useDeleteBulkDriveMutation,
} = driveAPIs; 