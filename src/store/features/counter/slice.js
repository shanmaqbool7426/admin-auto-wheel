'use client';
import { createSlice } from '@reduxjs/toolkit';
import { counterReducersList } from './reducers';

const {
  incrementReducer,
  decrementReducer,
  incrementByAmountReducer
} = counterReducersList;

const counerInitialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: counerInitialState,
  reducers: {
    increment: incrementReducer,
    decrement: decrementReducer,
    incrementByAmount: incrementByAmountReducer
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;