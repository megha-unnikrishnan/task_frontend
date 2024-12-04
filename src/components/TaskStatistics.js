// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';  // You can use other types of charts like Bar, Pie, etc.
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const TaskStatistics = () => {
//   const [stats, setStats] = useState({
//     completed_tasks: 0,
//     overdue_tasks: 0,
//     total_tasks: 0
//   });

//   // Fetch task statistics from the backend
//   useEffect(() => {
//     const token = localStorage.getItem('token'); 
//     console.log('tokenstatistics',token);
//      // Assuming the token is stored in localStorage

//     if (token) {
//       fetch('http://localhost:8000/task-statistics/', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,  // Add the Authorization header with the token
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Fetched Task Statistics:", data);  // Log the data here
//           setStats(data);  // Set the state with the fetched data
//         })
//         .catch((error) => console.error("Error fetching task statistics:", error));
//     } else {
//       console.error("No token found in localStorage");
//     }
//   }, []);

//   // Prepare data for the chart
//   const chartData = {
//     labels: ['Completed Tasks', 'Overdue Tasks', 'Total Tasks'],
//     datasets: [
//       {
//         label: 'Task Statistics',
//         data: [stats.completed_tasks, stats.overdue_tasks, stats.total_tasks],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div className="task-statistics-container">
//       <h2 className="text-2xl font-bold mb-4">Task Statistics</h2>
//       <div className="chart-container">
//         <Line data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default TaskStatistics;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskStatistics } from '../features/taskSlice';

const TaskStatistics = () => {
  const dispatch = useDispatch();

  // Extract statistics and loading state from Redux store
  const { statistics, loading, error } = useSelector((state) => state.tasks);

  // Fetch statistics on component mount
  useEffect(() => {
    dispatch(fetchTaskStatistics());
  }, [dispatch]);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>Error fetching statistics: {error}</div>;
  }

  // Calculate bar chart percentages
  const totalTasks = statistics.total_tasks || 1; // Avoid division by zero
  const completedPercentage = (statistics.completed_tasks / totalTasks) * 100;
  const overduePercentage = (statistics.overdue_tasks / totalTasks) * 100;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Task Statistics</h2>
      <div className="space-y-4">
        {/* Total Tasks */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Total Tasks</span>
            <span className="text-sm font-medium text-gray-700">{totalTasks}</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-lg">
            <div
              className="h-4 bg-blue-500 rounded-lg"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        {/* Completed Tasks */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Completed Tasks</span>
            <span className="text-sm font-medium text-gray-700">
              {statistics.completed_tasks} ({completedPercentage.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-lg">
            <div
              className="h-4 bg-green-500 rounded-lg"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
        </div>
        {/* Overdue Tasks */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Overdue Tasks</span>
            <span className="text-sm font-medium text-gray-700">
              {statistics.overdue_tasks} ({overduePercentage.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-lg">
            <div
              className="h-4 bg-red-500 rounded-lg"
              style={{ width: `${overduePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;
