import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    // Acțiuni pentru setarea automată a `isLoading` pentru operațiuni din `transactions`
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
