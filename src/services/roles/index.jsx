import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

// for roles
export const rolesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
        getRoles: builder.query({
      query: () => ({
        url: `${END_POINTS?.ROLES}`,
        method: 'GET',
      }),
      providesTags: ['ROLES'],
    }),
    


    addRole: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.ROLES}`,
        method: 'POST',
        body,

      }),
      invalidatesTags: ['ROLES'],
    }),


    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.ROLES}/${id}`,
        method: 'PUT',
        body: data,

      }),

      invalidatesTags: ['ROLES'],
    }),


    deleteRole: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.ROLES_DELETE}`,

          method: 'POST',
          body: { ids: ids },
        };

      },
      invalidatesTags: ['ROLES'],
    }),


    // for models
      addModel: builder.mutation({
        query: ({ makeId, name }) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models`,
        method: 'POST',
        body: { name }
      }),

       invalidatesTags: ['ROLES']
    }),
    // update model

    updateModel: builder.mutation({
      query: ({ id, makeId, data }) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models/${id}`,
        method: 'PUT',
        body: data,
      }),

      invalidatesTags: ['ROLES'],
    }),
    // delete make

    deleteMake: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.ROLES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ROLES'],

    }),
    // delete the model
    deleteModel: builder.mutation({
      query: ({makeId,id}) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ROLES'],

    }),
  

    // for variant
    addVariant: builder.mutation({
      query: ({ makeId, modelId, data }) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models/${modelId}/variants`,
        method: 'POST',
        body: data
      }),

      invalidatesTags: ['ROLES']
    }),


    updateVariant: builder.mutation({
      query: ({ makeId, modelId, variantId, data }) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models/${modelId}/variants`,
        method: 'PUT',
        body: {...data,makeId, modelId}
      }),

      invalidatesTags: ['ROLES']
    }),


    deleteVariant: builder.mutation({
      query: ({ makeId, modelId, variantId }) => ({
        url: `${END_POINTS?.ROLES}/${makeId}/models/${modelId}/variants/${variantId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ROLES']

    }),


  }),
});


export const {
  useGetRolesQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,


} = rolesAPIs;
