import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Registration action
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log('Token:', token); // Check if token exists

    try {
      const response = await axios.post('https://task-managemen-61cdd101e449.herokuapp.com/api/register/', userData, {
        headers: {
          // Remove Authorization header here for registration
          // Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response Data:', response.data);
      return response.data; // Handle backend response
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error); // Log error for debugging
      return rejectWithValue(error.response.data); // Returns the error from the backend
    }
  }
);


// Login action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://task-managemen-61cdd101e449.herokuapp.com/api/token/', {
        username: userData.username,
        password: userData.password,
      });
      console.log('Login response:', response.data);
      return response.data; // Includes access and refresh tokens
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { detail: 'Unexpected error occurred' });
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('token'); // Clear token from localStorage
  localStorage.removeItem('refreshToken'); // Clear refresh token if stored
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Action Payload in Fulfilled:', action.payload);
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logoutUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
