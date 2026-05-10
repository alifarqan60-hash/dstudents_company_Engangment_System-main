import React from 'react';
import { Line } from 'react-chartjs-2';  // You'll need to install chart.js and react-chartjs-2 for this
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../assets';

const ProjectCollabDashboard = () => {
  const navigate = useNavigate();

  // Sample data for the tasks and analytics (you can replace it with dynamic data)
  const tasks = [
    { status: 'To Do', count: 12 },
    { status: 'In Progress', count: 8 },
    { status: 'Completed', count: 15 },
    { status: 'Blocked', count: 2 },
  ];

  const analyticsData = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'TODO',
        data: [12, 19, 3, 5],
        backgroundColor: '#BDBDBD',
      },
      {
        label: 'DOING',
        data: [2, 3, 20, 5],
        backgroundColor: '#1E88E5',
      },
      {
        label: 'DEV DONE',
        data: [3, 10, 13, 15],
        backgroundColor: '#FFB74D',
      },
      {
        label: 'TESTING',
        data: [5, 2, 7, 9],
        backgroundColor: '#FF7043',
      },
      {
        label: 'DONE',
        data: [10, 7, 8, 6],
        backgroundColor: '#66BB6A',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-customBlue">Projects Dashborad</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
          {/* <StatCard label="Work Items" count="245" compare="+4.04%" /> */}
          <StatCard label="Developers" count="50"  />
          <StatCard label="Projects" count="12"  onClick={() => navigate('/app/projects')} />
          <StatCard label="Completed Tasks" count="300" compare="+3.2%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <Sidebar tasks={tasks} />

          {/* Main Analytics Section */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Analytics</h2>
              <div className="flex justify-between mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded-md">Show All States</button>
                <button className="bg-gray-200 px-4 py-2 rounded-md">This Month</button>
              </div>
              <div className="h-64">
                <BarChart data={analyticsData} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <RecentActivities />
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ label, count, compare, onClick }) => (
  <div onClick={onClick} className="bg-customDarkBlue text-white p-6 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105">
    <p className="text-lg">{label}</p>
    <h2 className="text-4xl font-bold">{count}</h2>
  </div>
);

// Sidebar Component
const Sidebar = ({ tasks }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Tasks</h2>
    <div className="mb-4">
      <div className="text-sm text-gray-600">You've completed 37% of your assigned tasks</div>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '37%' }}></div>
      </div>
    </div>

    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
        >
          <span className="text-gray-700">{task.status}</span>
          <span className="text-lg font-semibold text-gray-800">{task.count}</span>
        </div>
      ))}
    </div>
  </div>
);

// BarChart Component
const BarChart = ({ data }) => {
  return <Line data={data} />;
};

// RecentActivities Component
const RecentActivities = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
    <ul className="space-y-4">
      <li className="flex items-center">
        <div className="flex-shrink-0">
          <img src={IMAGES.avatar3} alt="user-avatar" className="w-10 h-10 rounded-full" />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">John Doe completed the task "Design Homepage".</p>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </li>
      <li className="flex items-center">
        <div className="flex-shrink-0">
          <img src={IMAGES.avatar4} alt="user-avatar" className="w-10 h-10 rounded-full" />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">Jane Smith commented on the task "Fix Login Bug".</p>
          <p className="text-sm text-gray-500">3 hours ago</p>
        </div>
      </li>
      <li className="flex items-center">
        <div className="flex-shrink-0">
          <img src={IMAGES.avatar5} alt="user-avatar" className="w-10 h-10 rounded-full" />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">Alice Johnson started the task "Implement Authentication".</p>
          <p className="text-sm text-gray-500">5 hours ago</p>
        </div>
      </li>
    </ul>
  </div>
);

export default ProjectCollabDashboard;
