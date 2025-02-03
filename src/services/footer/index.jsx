import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const footerAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFooterLinks: builder.query({
      query: (params) => ({
        url: END_POINTS?.FOOTER,
        method: 'GET',
        params,
      }),
      providesTags: ['FOOTER'],
    }),

    getFooterLinkById: builder.query({
      query: (id) => ({
        url: `${END_POINTS?.FOOTER}/${id}`,
        method: 'GET',
      }),
      providesTags: ['FOOTER'],
    }),

    addFooterLink: builder.mutation({
      query: (body) => ({
        url: END_POINTS?.FOOTER,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FOOTER'],
    }),

    updateFooterLink: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.FOOTER}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FOOTER'],
    }),

    deleteFooterLink: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.FOOTER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FOOTER'],
    }),

    deleteBulkFooterLinks: builder.mutation({
      query: (ids) => ({
        url: `${END_POINTS?.FOOTER_DELETE}`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['FOOTER'],
    }),
  }),
});

export const {
  useGetFooterLinksQuery,
  useGetFooterLinkByIdQuery,
  useAddFooterLinkMutation,
  useUpdateFooterLinkMutation,
  useDeleteFooterLinkMutation,
  useDeleteBulkFooterLinksMutation,
} = footerAPIs;
