const incrementReducer = (state) => {
  state.value += 1
};

const decrementReducer = (state) => {
  state.value -= 1
};

const incrementByAmountReducer = (state, action) => {
  state.value += action.payload
}

export const counterReducersList = {
  incrementReducer,
  decrementReducer,
  incrementByAmountReducer
};