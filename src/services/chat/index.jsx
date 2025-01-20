import { BASE_API } from '@/services/base-api';
import { END_POINTS } from '@/constants/endpoints';

export const chatAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getConversations: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.CONVERSATION}/${params}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CONVERSATIONS'],
    }),
    // List of conversations
    getConversationsList: builder.query({
        query: (params) => ({
          url: `${END_POINTS?.CONVERSATION_LIST}`,
          method: 'GET',
          params,
        }),
        providesTags: ['CONVERSATIONS'],
      }),

    addConversation: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.CONVERSATION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CONVERSATIONS'],
    }),

    deleteBulkConversation: builder.mutation({
      query(ids) {
        return {
          url: `${END_POINTS?.CONVERSATION_DELETE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['CONVERSATIONS'],
    }),

  }),
});


export const {
  useGetConversationsQuery,
  useGetConversationsListQuery,
  useAddConversationMutation,
  useDeleteBulkConversationMutation,
} = chatAPIs;
