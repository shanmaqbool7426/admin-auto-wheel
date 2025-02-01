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




  }),
});


export const {
  useGetRolesQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,


} = rolesAPIs;
