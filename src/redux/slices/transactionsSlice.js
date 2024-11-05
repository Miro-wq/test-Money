import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  fetchCategories,
} from '../operations/transactionsOperations.js';

const initialState = {
  items: [],
  categories: [],
  error: null,
  isLoading: false,
  trasactionIdForDelete: '',
  transactionForUpdate: {
    id: '',
    type: '',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTrasactionIdForDelete: (state, action) => {
      state.trasactionIdForDelete = action.payload;
    },
    setTrasactionForUpdate: (state, action) => {
      state.transactionForUpdate = action.payload;
      console.log(state.transactionForUpdate.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        console.log('Transactios: ', action.payload);
        state.items = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(editTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(el => el.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const { id, type, amount } = action.payload;

        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.totalBalance += type === 'income' ? -amount : amount;

          state.items.splice(index, 1);
        }
      })
      .addCase(fetchCategories.pending, state => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTrasactionIdForDelete, setTrasactionForUpdate } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
