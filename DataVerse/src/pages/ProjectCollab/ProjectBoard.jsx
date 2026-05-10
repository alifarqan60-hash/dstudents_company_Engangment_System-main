import React, { useState } from 'react';
import { BsSortDown, BsThreeDotsVertical } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { IMAGES } from '../../assets';

// Sample data for tasks
const sampleTasks = {
  TODO: [
    { id: 1, name: "Task Name 1", assignedTo: "John Doe", timeRemaining: "12h 4m 4s" },
    { id: 2, name: "Task Name 2", assignedTo: "Jane Doe", timeRemaining: "8h 3m 2s" }
  ],
  DOING: [{ id: 3, name: "Task Name 3", assignedTo: "John Doe", timeRemaining: "5h 45m 10s" }],
  TESTING: [{ id: 5, name: "Task Name 4", assignedTo: "John Doe", timeRemaining: "1h 22m 5s" }],
  DONE: [
    { id: 6, name: "Task Name 5", assignedTo: "Jane Doe", status: "Completed" },
    { id: 7, name: "Task Name 6", assignedTo: "John Doe", status: "Completed" }
  ]
};

const ProjectBoard = () => {
  const [tasks, setTasks] = useState(sampleTasks);

  const moveTask = (taskId, fromColumn, toColumn) => {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks[fromColumn].find(task => task.id === taskId);
      const updatedFromColumn = prevTasks[fromColumn].filter(task => task.id !== taskId);
      const updatedToColumn = [...prevTasks[toColumn], taskToMove];

      return {
        ...prevTasks,
        [fromColumn]: updatedFromColumn,
        [toColumn]: updatedToColumn
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Socials - App</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
              <BsSortDown className="mr-2" /> Sort by
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Task"
                className="border border-gray-300 px-4 py-2 rounded-lg pl-10 shadow-sm"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        <p className="text-gray-500 mt-2">Home {'>'} Projects {'>'} Socials</p>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TaskColumn title="TODO" tasks={tasks.TODO} column="TODO" moveTask={moveTask} />
        <TaskColumn title="DOING" tasks={tasks.DOING} column="DOING" moveTask={moveTask} />
        <TaskColumn title="TESTING" tasks={tasks.TESTING} column="TESTING" moveTask={moveTask} />
        <TaskColumn title="DONE" tasks={tasks.DONE} column="DONE" moveTask={moveTask} isDone />
      </div>
    </div>
  );
};

export default ProjectBoard;

const TaskColumn = ({ title, tasks, column, moveTask, isDone }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} column={column} moveTask={moveTask} isDone={isDone} />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task, column, moveTask, isDone }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMoveTask = (toColumn) => {
    moveTask(task.id, column, toColumn);
    setDropdownOpen(false);
  };

  const getDropdownOptions = () => {
    const options = [];
    if (column !== 'TODO') options.push({ label: 'Mark TODO', action: () => handleMoveTask('TODO') });
    if (column !== 'DOING') options.push({ label: 'Mark Doing', action: () => handleMoveTask('DOING') });
    if (column !== 'TESTING') options.push({ label: 'Mark Testing', action: () => handleMoveTask('TESTING') });
    if (column !== 'DONE') options.push({ label: 'Mark Done', action: () => handleMoveTask('DONE') });
    return options;
  };

  return (
    <div className="bg-blue-100 rounded-lg p-4 shadow-md hover:shadow-lg transition flex flex-col gap-4 justify-between">
      <div className='flex gap-4 justify-between'>
        <div>
          <h3 className="text-md font-medium text-gray-800">{task.name}</h3>
          <p className="text-sm text-gray-500">{task.timeRemaining}</p>
        </div>
        <div className='relative'>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-2">
            <BsThreeDotsVertical />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {getDropdownOptions().map((option, index) => (
                <button key={index} onClick={option.action} className="block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-200 w-full text-left">
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
      </div>
      <img
            src={IMAGES.avatar12}
            alt={task.assignedTo}
            className="w-8 h-8 rounded-full"
          />
      <div className="flex items-center space-x-2">
        {isDone ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
