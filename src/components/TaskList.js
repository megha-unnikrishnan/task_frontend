// import TaskStatistics from "./TaskStatistics";
// import React, { useState, useEffect } from "react"; 
// import { useDispatch, useSelector } from "react-redux";
// import { createTask, deleteTask, updateTask, fetchTasks } from "../features/taskSlice";
// import { WebSocketService } from "./websocket";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { logoutUser } from "../features/authSlice"; // Import the logout action
// import { useNavigate } from 'react-router-dom';

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tasks = useSelector((state) => state.tasks.tasks);
//   const username = useSelector((state) => state.auth.user);
//   const loading = useSelector((state) => state.tasks.loading);

//   const [showForm, setShowForm] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     status: "Pending",
//     due_date: "",
//   });

//   const [errors, setErrors] = useState({});

//   const wsUrl = "ws://localhost:8000/ws/tasks/";

//   useEffect(() => {
//     dispatch(fetchTasks()); 

//     const ws = WebSocketService.getInstance();
//     ws.connect(wsUrl);

//     ws.socketRef.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       const { action, task } = message;
//       if (action === "create") {
//         dispatch(createTask(task)); 
//         toast.success("Task created successfully!");
//       } else if (action === "update") {
//         dispatch(updateTask({ taskId: task.id, taskData: task }));
//         toast.success("Task updated successfully!");
//       } else if (action === "delete") {
//         dispatch(deleteTask(task.id));
//         toast.success("Task deleted successfully!");
//       }
//     };

//     return () => {
//       ws.close();
//     };
//   }, [dispatch, wsUrl]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!newTask.title) {
//       newErrors.title = "Title is required.";
//     }
//     if (!newTask.description) {
//       newErrors.description = "Description is required.";
//     }
//     if (!newTask.due_date) {
//       newErrors.due_date = "Due date is required.";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     if (editingTask) {
//       dispatch(updateTask({ taskId: editingTask.id, taskData: newTask }));
//       toast.success("Task updated successfully!");
//       setEditingTask(null);
//     } else {
//       dispatch(createTask(newTask));
//       toast.success("Task created successfully!");
//     }
//     setShowForm(false);
//     setNewTask({ title: "", description: "", status: "Pending", due_date: "" });
//     setErrors({});
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//     setNewTask({
//       title: task.title,
//       description: task.description,
//       status: task.status,
//       due_date: task.due_date,
//     });
//     setShowForm(true);
//   };

//   const handleDelete = (taskId) => {
//     dispatch(deleteTask(taskId));
//     toast.success("Task deleted successfully!");
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/');
//     toast.success("Logged out successfully!");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
//       {/* Logout button at the top right */}
//       <button
//         onClick={handleLogout}
//         className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
//       >
//         Logout
//       </button>

//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">Task List</h1>
      
//       {loading && <p className="text-center text-gray-500">Loading...</p>}

//       <div className="mb-4 text-right">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
//         >
//           {showForm ? "Cancel" : editingTask ? "Update Task" : "Create Task"}
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
//           <div>
//             <label className="block text-gray-700">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={newTask.title}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={newTask.description}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Status</label>
//             <select
//               name="status"
//               value={newTask.status}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700">Due Date</label>
//             <input
//               type="date"
//               name="due_date"
//               value={newTask.due_date}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-2 border ${errors.due_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date}</p>}
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
//             >
//               {editingTask ? "Update" : "Create"} Task
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="mt-6">
//         {tasks.map((task) => (
//           <div key={task.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
//             <p className="text-gray-600">{task.description}</p>
//             <p className="text-gray-500">Status: {task.status}</p>
//             <p className="text-gray-500">Due Date: {task.due_date}</p>
//             <div className="mt-4 flex space-x-4">
//               <button
//                 onClick={() => handleEdit(task)}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(task.id)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <TaskStatistics />
//       <ToastContainer />
//     </div>
//   );
// };

// export default TaskList;





import TaskStatistics from "./TaskStatistics";
import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { createTask, deleteTask, updateTask, fetchTasks } from "../features/taskSlice";
import { WebSocketService } from "./websocket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const username = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.tasks.loading);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
  });

  const [errors, setErrors] = useState({});

  const wsUrl = "wss://task-managemen-61cdd101e449.herokuapp.com/ws/tasks/";


  useEffect(() => {
    dispatch(fetchTasks());

    const ws = WebSocketService.getInstance();
    ws.connect(wsUrl);

    ws.socketRef.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { action, task } = message;
      if (action === "create") {
        dispatch(createTask(task)); 
        toast.success("Task created successfully!");
      } else if (action === "update") {
        dispatch(updateTask({ taskId: task.id, taskData: task }));
        toast.success("Task updated successfully!");
      } else if (action === "delete") {
        dispatch(deleteTask(task.id));
        toast.success("Task deleted successfully!");
      }
    };

    return () => {
      ws.close();
    };
  }, [dispatch, wsUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTask.title) {
      newErrors.title = "Title is required.";
    }
    if (!newTask.description) {
      newErrors.description = "Description is required.";
    }
    if (!newTask.due_date) {
      newErrors.due_date = "Due date is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (editingTask) {
      dispatch(updateTask({ taskId: editingTask.id, taskData: newTask }));
      toast.success("Task updated successfully!");
      setEditingTask(null);
    } else {
      dispatch(createTask(newTask));
      toast.success("Task created successfully!");
    }
    setShowForm(false);
    setNewTask({ title: "", description: "", status: "Pending", due_date: "" });
    setErrors({});
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
    });
    setShowForm(true);
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    toast.success("Task deleted successfully!");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    toast.success("Logged out successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl relative">
      {/* Logout button at the top right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Task Management</h1>

      {loading && <p className="text-center text-gray-500">Loading tasks...</p>}

      {/* Button to toggle form visibility */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          {showForm ? "Cancel" : editingTask ? "Update Task" : "Create Task"}
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-8 rounded-xl shadow-lg">
          <div>
            <label className="block text-lg text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-lg text-gray-700">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-lg text-gray-700">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-lg text-gray-700">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={newTask.due_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${errors.due_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              {editingTask ? "Update" : "Create"} Task
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="mt-8 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:bg-gray-100 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-500">Status: <span className={`font-bold ${task.status === 'Completed' ? 'text-green-600' : task.status === 'In Progress' ? 'text-yellow-600' : 'text-gray-600'}`}>{task.status}</span></p>
            <p className="text-gray-500">Due Date: {task.due_date}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleEdit(task)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Task Statistics */}
      <TaskStatistics />
      
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default TaskList;
