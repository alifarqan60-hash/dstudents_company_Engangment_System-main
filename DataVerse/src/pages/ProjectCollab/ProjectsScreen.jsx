import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { BsSortDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProjectsScreen = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate("/app/project-board");
  }
  // Sample data for the projects
  const projects = [
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 100, status: "Completed" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 100, status: "Completed" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
    { name: "Savebox - Mobile App", tasksRemaining: 12, completion: 72, status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
        </div>
        <div className="flex items-center space-x-4">
          
          <input
            type="text"
            placeholder="Search Project"
            className="border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>
      </header>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} onClick={()=> handleProjectClick(project)} />
        ))}
      </div>
    </div>
  );
};

// ProjectCard Component
const ProjectCard = ({ project, onClick }) => {
  const { name, tasksRemaining, completion, status} = project;

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">{tasksRemaining} Tasks Remaining</p>
      <div className="flex items-center mt-4">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${completion === 100 ? "bg-green-500" : "bg-red-500"}`}
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-semibold text-gray-600">{completion}%</span>
      </div>
      {completion === 100 ? (
        <p className="text-green-500 font-semibold mt-2">Completed 😊</p>
      ) : (
        <p className="text-red-500 font-semibold mt-2">{status}</p>
      )}
    </div>
  );
};

export default ProjectsScreen;
