// Banner Service

import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const bannerAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getBanners: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.BANNER}`,
        method: 'GET',
        params,
      }),
      providesTags: ['BANNERS'],
    }),
    // update banner
    updateBanner: builder.mutation({
      query: ({ body, id }) => ({
        url: `${END_POINTS?.BANNER}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['BANNERS'],
    }),
    // delete banner
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.BANNER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BANNERS'],
    }),

    addBanner: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.BANNER}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BANNERS'],
    }),

    deleteBulkBanner: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.BANNER_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['BANNERS'],
    }),

  }),
});


export const {
  useGetBannersQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useDeleteBulkBannerMutation,
} = bannerAPIs;
