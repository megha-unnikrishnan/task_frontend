import React from 'react';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">Due: {new Date(task.due_date).toLocaleString()}</p>
      <p className={`text-sm ${task.is_completed ? 'text-green-600' : 'text-red-600'}`}>
        {task.is_completed ? 'Completed' : 'Pending'}
      </p>
      <button
        onClick={() => onEdit(task)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
