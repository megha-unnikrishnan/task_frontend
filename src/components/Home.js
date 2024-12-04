import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-xl mb-4">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
