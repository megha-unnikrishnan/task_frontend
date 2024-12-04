import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import { useNavigate } from 'react-router-dom';
import './index.css'; // Adjust path if needed
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
const App = () => {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
         {/* Route for the task list */}
         <Route path="/tasks" element={<TaskList />} />

          {/* Route for creating a task */}
          <Route path="/tasks/create" element={<TaskForm />} />

          {/* Route for editing a task */}
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
       
     

       
      </Routes>
  
    </Router>
  );
};

export default App;
