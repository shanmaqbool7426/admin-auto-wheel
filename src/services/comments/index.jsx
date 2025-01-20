import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const commentsAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getComments: builder.query({
      query: (params) => ({
        url: `${END_POINTS.COMMENTS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['COMMENTS'],
    }),

    deleteBulkComments: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS.COMMENTS_DELETE}`,
          method: 'POST',
          body: { commentIds: ids },
        };
      },
      invalidatesTags: ['COMMENTS'],
    }),

  }),
});


export const {
  useGetCommentsQuery,
  useDeleteBulkCommentsMutation,
} = commentsAPIs;
