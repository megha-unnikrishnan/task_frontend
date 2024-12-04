import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for tasks
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  statistics: {
    completed_tasks: 0,
    overdue_tasks: 0,
    total_tasks: 0,
  },
};

// Fetch tasks action
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken; // Get token from auth slice
    
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return tasks data from backend
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create task action
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken;
    console.log('Token:', token);
    try {
      const response = await axios.post('http://localhost:8000/api/tasks/', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return created task data
    } catch (error) {
      console.error('Error creating task:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update task action
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, taskData }, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}/`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return updated task data
    } catch (error) {
      console.error('Error updating task:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete task action
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken;
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return taskId; // Return taskId for deletion from state
    } catch (error) {
      console.error('Error deleting task:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTaskStatistics = createAsyncThunk(
  'tasks/fetchTaskStatistics',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken; // Get token from auth slice
    try {
      const response = await axios.get('http://localhost:8000/task-statistics/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return statistics data from backend
    } catch (error) {
      console.error('Error fetching task statistics:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add created task to state
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update task in state
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove deleted task
      })
      .addCase(fetchTaskStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchTaskStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default tasksSlice.reducer;
