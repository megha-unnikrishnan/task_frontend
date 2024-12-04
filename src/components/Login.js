// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { loading, error, accessToken } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ username, password }));
//   };

//   useEffect(() => {
//     if (accessToken) {
//       // Redirect to task list page after successful login
//       navigate("/tasks");
//     }
//   }, [accessToken, navigate]);

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         {error && <p className="text-red-600 text-center">{error.detail || error.non_field_errors}</p>}

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
            
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { loading, error, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  // Redirect user after successful login
  useEffect(() => {
    if (accessToken) {
      navigate("/tasks");
    }
  }, [accessToken, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-600 text-center">{error.detail || error.non_field_errors}</p>}

        {/* Username input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link to Sign Up page */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
