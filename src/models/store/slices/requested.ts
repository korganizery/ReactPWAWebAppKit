// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiResponse {
  key: string;  // 根据实际API的返回数据结构进行定义
}

interface RequestState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: RequestState = {
  data: null,
  loading: false,
  error: null,
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    requestStart(state: RequestState) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(state: RequestState, action: PayloadAction<ApiResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    requestFail(state: RequestState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestStart, requestSuccess, requestFail } = requestSlice.actions;


