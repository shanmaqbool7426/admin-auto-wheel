import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const categoriesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: `${END_POINTS.CATEGORIES}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CATEGORIES'],
    }),

    addCategory: builder.mutation({
      query: (body) => ({
        url: END_POINTS.ADD_CATEGORY,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CATEGORIES'],
    }),

    updateCategory: builder.mutation({
      query({ id, body }) {
        return {
          url: `${END_POINTS.UPDATE_CATEGORY}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['CATEGORIES'],
    }),
    // bulk delete
    deleteMultipleCategories: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS.DELETE_MULTIPLE_CATEGORIES}`,
          method: 'POST', // Changed from DELETE to POST
          body: { ids },
        };
      },
      invalidatesTags: ['CATEGORIES'],
    }),

    deleteCategory: builder.mutation({
      query(id) {
        return {
          url: `${END_POINTS.DELETE_CATEGORY}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['CATEGORIES'],
    }),
  }),

});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteMultipleCategoriesMutation,
} = categoriesAPIs;