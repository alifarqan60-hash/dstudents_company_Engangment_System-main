import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DetailedNewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { news } = location.state || {};

  if (!news) {
    return <div>News article not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen p-4 rounded-tl-3xl rounded-bl-3xl">
      {/* Header */}
      <header className="bg-customBlue text-white py-4 rounded-2xl">
        <div className="container mx-auto flex justify-between items-center px-3">
          <h1 className="text-xl font-bold ml-2">News & Updates</h1>
          {/* <nav>
            <a href="/" className="px-3 hover:underline">
              Home
            </a>
            <a href="/news" className="px-3 hover:underline">
              News
            </a>
            <a href="/community" className="px-3 hover:underline">
              Community
            </a>
            <a href="/jobs" className="px-3 hover:underline">
              Jobs
            </a>
            <a href="/projects" className="px-3 hover:underline">
              Projects
            </a>
          </nav> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10">
        <button
          className="flex items-center text-customBlue hover:underline mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Back to News
        </button>
        <div className="bg-white p-6 rounded-md shadow-lg">
          <img
            src={news.imgUrl}
            alt={news.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl font-bold text-customBlue mb-2">
            {news.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {news.timestamp} by {news.author}
          </p>
          <p className="text-lg text-gray-700 mb-4">{news.description}</p>
          <p className="text-gray-700">{news.content}</p>
          <p className="text-customBlue mt-4">{news.category}</p>
        </div>
      </main>
    </div>
  );
};

export default DetailedNewsPage;
