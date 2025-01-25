import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const postAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getPosts: builder.query({
      query: (params) => ({
        url: `${END_POINTS.BLOG_LISTING}`,
        method: 'GET',
        params,
      }),
      providesTags: ['BLOG_POSTS'],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `${END_POINTS.GET_BLOG_BY_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: ['BLOG_POSTS'],
    }),

    searchPosts: builder.query({
      query: (params) => ({
        url: `${END_POINTS.BLOG_SEARCH}`,
        method: 'GET',
        params,
      }),
      providesTags: ['BLOG_POSTS'],
    }),

    addPost: builder.mutation({
      query: (body) => ({
        url: END_POINTS.BLOG_CREATE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BLOG_POSTS'],
    }),

    getPost: builder.query({
      query: (id) => `${END_POINTS.BLOG_LISTING}/${id}`,
      providesTags: ['BLOG_POSTS'],
    }),

    updatePost: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${END_POINTS.BLOG_UPDATE}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['BLOG_POSTS'],
    }),

    deletePost: builder.mutation({
      query(id) {
        return {
          url: `${END_POINTS.BLOG_DELETE_SINGLE}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['BLOG_POSTS'],
    }),

    deleteMultiplePost: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS.BLOG_DELETE}`,
          method: 'DELETE',
          body: { ids },
        };
      },
      invalidatesTags: ['BLOG_POSTS'],
    }),

    duplicatePost: builder.mutation({
      query(id) {
        return {
          url: `${END_POINTS.DUPLICATE_POST}/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['BLOG_POSTS'],
    }),
    duplicateMultiplePost: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS.DUPLICATE_POST}`,
          method: 'POST',
          body: { ids },
        };
      },
      invalidatesTags: ['BLOG_POSTS'],
    }),
    //status-counts
    getStatusCounts: builder.query({
      query: () => `${END_POINTS.STATUS_COUNTS}`,
      providesTags: ['BLOG_POSTS'],
    }),
    getCategories: builder.query({
      query: () => `${END_POINTS.CATEGORIES}`,
      // providesTags: ['BLOG_POSTS'],
    }),

    //get tags
    getTags: builder.query({
      query: () => `${END_POINTS.TAGS}`,
      // providesTags: ['BLOG_POSTS'],
    }),
  }),
});


export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useSearchPostsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useDeleteMultiplePostMutation,
  useDuplicatePostMutation,
  useDuplicateMultiplePostMutation,
  useGetStatusCountsQuery,
} = postAPIs;
