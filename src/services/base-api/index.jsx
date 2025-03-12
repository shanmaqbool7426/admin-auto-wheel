import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '@/constants/api-endpoints';
import { PROVIDES_TAGS } from '../providesTags';

// console.log("BASE_URL",BASE_URL)
const baseQuery = fetchBaseQuery({ 
  baseUrl: `http://localhost:5000/api`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
})

export const BASE_API = createApi({

  reducerPath: 'api',

  baseQuery: baseQuery,

  tagTypes: PROVIDES_TAGS,

  endpoints: () => ({}),
})

export const enhancedApi = BASE_API.enhanceEndpoints({
  endpoints: () => ({}),
})
