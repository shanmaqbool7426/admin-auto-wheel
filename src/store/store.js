import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counter/slice';
import { BASE_API } from '@/services/base-api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [BASE_API.reducerPath]: BASE_API.reducer,
      counter: counterSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(BASE_API.middleware),
  })
}