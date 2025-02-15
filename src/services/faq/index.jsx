import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const faqAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.FAQ}`,
        method: 'GET',
        params,
      }),
      providesTags: ['FAQ'],
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS?.FAQ}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.FAQ}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FAQ'],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.FAQ}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqAPIs;