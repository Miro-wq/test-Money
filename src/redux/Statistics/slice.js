/*Temporar*/
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getTransactionsCategories,
  getTransactionsSummaryByPeriod,
} from './operations';

const initialState = {
  summary: [],
  categories: [],
  isStatisticsLoading: false,
  isStatisticsError: null,
};

const slice = createSlice({
  name: 'statistics',
  initialState,
  extraReducers: builder => {
    builder

      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(
        getTransactionsSummaryByPeriod.fulfilled,
        (state, { payload }) => {
          state.isStatisticsLoading = false;
          state.summary = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactionsCategories.rejected,
          getTransactionsSummaryByPeriod.rejected
        ),
        (state, { payload }) => {
          state.isStatisticsLoading = false;
          state.isStatisticsError = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactionsCategories.pending,
          getTransactionsSummaryByPeriod.pending
        ),
        state => {
          state.isStatisticsLoading = true;
          state.isStatisticsError = null;
        }
      );
  },
});

export const statisticsReducer = slice.reducer;
