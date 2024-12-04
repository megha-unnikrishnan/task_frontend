








// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../features/authSlice';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     dob: '',
//     mobile: '',
//     password: '',
//     confirm_password: '',
//   });

//   const { loading, error, message } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirm_password) {
//       alert('Passwords must match');
//       return;
//     }
//     dispatch(registerUser(formData));
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Column */}
//       <div className="hidden md:flex flex-1 justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white">
//         <div className="text-center space-y-6 px-8">
//           <h1 className="text-4xl font-extrabold">Welcome Back!</h1>
//           <p className="text-lg">
//             Join our community and connect with amazing people. Let's build something great together!
//           </p>
//           <img
//             src="https://via.placeholder.com/300x300" // Replace with your desired image URL
//             alt="Illustration"
//             className="w-full max-w-xs mx-auto"
//           />
//         </div>
//       </div>

//       {/* Right Column */}
//       <div className="flex-1 flex justify-center items-center bg-gray-100">
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

//           {message && <p className="text-green-600 text-center">{message}</p>}
//           {error && (
//             <p className="text-red-600 text-center">{error.detail || error.non_field_errors}</p>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirm_password"
//                 value={formData.confirm_password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    mobile: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.first_name) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords must match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(registerUser(formData))
      .then(() => {
        navigate('/'); // Redirect to home page after successful registration
      })
      .catch((err) => {
        console.error(err); // Handle errors here if necessary
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && (
          <p className="text-red-600 text-center">{error.detail || error.non_field_errors}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <p className="text-red-600 text-sm">{errors.confirm_password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/')} // Navigate to login page
            className="text-blue-500 hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;


