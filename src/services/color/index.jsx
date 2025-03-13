import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const colorAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.COLOR}`,
        method: 'GET',
        params,
      }),
      providesTags: ['COLORS'],
    }),
    getColorsByType: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.COLOR}/type`,
        method: 'GET',
        params,
      }),
    }),

    updateColor: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.COLOR}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['COLORS'],
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.COLOR}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COLORS'],
    }),

    addColor: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.COLOR}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['COLORS'],
    }),

    deleteBulkColor: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.COLOR_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['COLORS'],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorsByTypeQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
  useDeleteBulkColorMutation,
} = colorAPIs;
