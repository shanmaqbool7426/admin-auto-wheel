import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const makeAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

        getMakes: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.MAKE}?type=${params?.type}`,
        method: 'GET',
        params,
      }),
      providesTags: ['MAKES'],
    }),

    addMake: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.MAKE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MAKES'],
    }),

    updateMake: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.MAKE}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MAKES'],
    }),

    deleteBulkMake: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.MAKE_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['MAKES'],
    }),

    // for models
      addModel: builder.mutation({
        query: ({ makeId, name }) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models`,
        method: 'POST',
        body: { name }
      }),
       invalidatesTags: ['MAKES']
    }),
    // update model
    updateModel: builder.mutation({
      query: ({ id, makeId, data }) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MAKES'],
    }),
    // delete make
    deleteMake: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.MAKE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MAKES'],
    }),
    // delete the model
    deleteModel: builder.mutation({
      query: ({makeId,id}) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MAKES'],
    }),
  

    // for variant
    addVariant: builder.mutation({
      query: ({ makeId, modelId, data }) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models/${modelId}/variants`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['MAKES']
    }),

    updateVariant: builder.mutation({
      query: ({ makeId, modelId, variantId, data }) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models/${modelId}/variants`,
        method: 'PUT',
        body: {...data,makeId, modelId}
      }),
      invalidatesTags: ['MAKES']
    }),

    deleteVariant: builder.mutation({
      query: ( {makeId, modelId, variant}) => ({
        url: `${END_POINTS?.MAKE}/${makeId}/models/${modelId}/variants/${variant}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MAKES']
    }),


  }),
});


export const {
  useGetMakesQuery,
  useAddMakeMutation,
  useDeleteBulkMakeMutation,
  useDeleteMakeMutation,
  useAddModelMutation,
  useUpdateModelMutation,
  useUpdateMakeMutation,
  useDeleteModelMutation,
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation

} = makeAPIs;
