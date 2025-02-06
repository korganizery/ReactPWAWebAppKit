import { configureStore } from '@reduxjs/toolkit'
import * as slices from './slices'

const store = configureStore({
  reducer: {
    counter: slices.counterSlice.reducer,
    request: slices.requestSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;