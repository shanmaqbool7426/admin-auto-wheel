import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const dashboardAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getLatestUsers: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.GET_LATEST_USERS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['LATEST_USERS'],
    }),

    getTopPerformingPosts: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.GET_TOP_PERFORMING_POSTS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['TOP_PERFORMING_POSTS'],
    }),

    getLatestPosts: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.GET_LATEST_POSTS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['LATEST_POSTS'],
    }),

  }),
});


export const {
  useGetLatestUsersQuery,
  useGetTopPerformingPostsQuery,
  useGetLatestPostsQuery,
} = dashboardAPIs;
