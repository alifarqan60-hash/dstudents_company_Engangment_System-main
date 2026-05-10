import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DatasetDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataset = location.state?.item || {};

  if (!dataset) {
    return <div>Dataset not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8 rounded-tl-3xl rounded-bl-3xl">
      <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Dataset Details</h1>
        <p className="text-lg mt-2">
          View detailed information about the dataset.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition mb-4"
          onClick={() => navigate("/admin/datasets")}
        >
          Back to Datasets
        </button>
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{dataset.title}</h2>
            <p className="text-gray-700">{dataset.description}</p>
          </div>
          {dataset.imgurl && (
            <div className="mb-4">
              <img
                src={dataset.imgurl}
                alt={dataset.title}
                className="w-64 h-auto rounded-md shadow-md"
              />
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex gap-2 items-center flex-wrap">
              {dataset.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4 flex gap-4">
            <div className='flex flex-col'>
              <h3 className="text-lg font-semibold mb-2">View</h3>
              <a
                href={`${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(dataset.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition inline-block text-center"
              >
                View Dataset
              </a>
            </div>
            <div className='flex flex-col'>
              <h3 className="text-lg font-semibold mb-2">Download</h3>
              <a
                href={`${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(dataset.url)}&download=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-customBlue text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition inline-block text-center"
              >
                Download Dataset
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Delete</h3>
            <button
              onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this dataset from the list? (Note: This UI action is being refined)");
                if (confirmed) navigate("/admin/datasets");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
            >
              Delete Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetails;
