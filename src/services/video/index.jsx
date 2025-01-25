import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const videoAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.VIDEO}/listing`,
        method: 'GET',
        params,
      }),
      providesTags: ['VIDEOS'],
    }),

    addVideo: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.VIDEO}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VIDEOS'],
    }),

    updateVideo: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.VIDEO}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['VIDEOS'],
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.VIDEO}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VIDEOS'],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoAPIs;