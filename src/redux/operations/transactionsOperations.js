import axios from '../axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const BASE_URL = 'https://wallet.b.goit.study/api';

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Returnează datele obținute de la API
    } catch (error) {
      toast.error('Something went wrong wen fetching transactions!');
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Add Transaction
export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/transactions`,
        transactionData
      );
      toast.success('Transaction added successfully! ^_^');
      return response.data; // Returnează datele tranzacției adăugate
    } catch (error) {
      toast.error('Transaction not saved, something went wrong!');
      return rejectWithValue(error.response?.data || error.message); // Trimite eroarea în Redux
    }
  }
);

// Edit Transaction
export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ transactionId, transactionData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/transactions/${transactionId}`,
        transactionData
      );
      toast.success('Transaction modified successfully! ^_^');
      return response.data; // Returnează datele tranzacției editate
    } catch (error) {
      toast.error('Transaction not modified, somethig went wrong!');
      return rejectWithValue(error.response?.data || error.message); // Trimite eroarea în Redux
    }
  }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Transaction deleted successfully !');
      return id; // Returnează ID-ul tranzacției pentru a-l elimina din state-ul Redux
    } catch (error) {
      toast.error('Transaction not deleted, something went wrong!');
      return rejectWithValue(error.response?.data || error.message); // Trimite eroarea în Redux
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  }
);

// Fetch Transaction Categories
export const fetchTransactionCategories = createAsyncThunk(
  'transactions/fetchCategories',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/transaction-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error('Failed to load transaction categories');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
