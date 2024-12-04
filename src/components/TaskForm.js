



// import React, { useState } from 'react';

// const TaskForm = ({ taskToEdit, onSubmit }) => {
//   const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
//   const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
//   const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : 'Pending');
//   const [createDate, setCreateDate] = useState(
//     taskToEdit ? taskToEdit.createDate : new Date().toISOString().split('T')[0]
//   );
//   const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : '');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const taskData = { title, description, status, createDate, dueDate };
//     onSubmit(taskData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800">
//         {taskToEdit ? 'Edit Task' : 'Create Task'}
//       </h2>

//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter task title"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Task Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter task description"
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Create Date</label>
//         <input
//           type="date"
//           value={createDate}
//           onChange={(e) => setCreateDate(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//       >
//         {taskToEdit ? 'Update Task' : 'Create Task'}
//       </button>
//     </form>
//   );
// };

// export default TaskForm;



import React, { useState } from 'react';

const TaskForm = ({ taskToEdit, onSubmit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : 'Pending');
  const [createDate, setCreateDate] = useState(
    taskToEdit ? taskToEdit.createDate : new Date().toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Title
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    // Validate Description
    if (!description.trim()) {
      setError('Task description is required.');
      return;
    }

    // Validate Due Date
    if (new Date(dueDate) < new Date(createDate)) {
      setError('Due date cannot be earlier than the creation date.');
      return;
    }

    // If all validations pass
    setError('');
    const taskData = { title, description, status, createDate, dueDate };
    onSubmit(taskData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {taskToEdit ? 'Edit Task' : 'Create Task'}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Create Date</label>
        <input
          type="date"
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
      >
        {taskToEdit ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;

