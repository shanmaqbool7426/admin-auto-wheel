import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL, FE_BASE_URL } from '@/constants/config';
import { PROVIDES_TAGS } from '../providesTags';


console.log("BASE_URL",BASE_URL)
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // prepareHeaders: (headers) => {
  //   // By default, if we have a token in the store, let's use that for authenticated requests
  //   const token = store.getState().auth.token
  //   if (token) {
  //     headers.set('authentication', `Bearer ${token}`)
  //   }
  //   return headers 
  // },
})
// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const BASE_API = createApi({

  reducerPath: 'api',

  baseQuery: baseQuery,

  tagTypes: PROVIDES_TAGS,

  endpoints: () => ({}),
})

export const enhancedApi = BASE_API.enhanceEndpoints({
  endpoints: () => ({}),
})
