import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import tasksReducer from './features/taskSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer, // Add the tasks reducer here
    
    
  },
});

export default store;
