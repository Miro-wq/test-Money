import axios from '../axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://wallet.b.goit.study/api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/sign-in`,
        credentials
      );
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login Failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Register Failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        '/api/sign-out',
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      localStorage.removeItem('token'); // Șterge token-ul din localStorage
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/current`);
      console.log('User Info:', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
