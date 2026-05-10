import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DetailedNewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { news } = location.state || {};

  if (!news) {
    return <div>News article not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <header className="bg-customBlue text-white py-4 rounded-2xl">
        <div className="container mx-auto flex justify-between items-center px-3">
          <h1 className="text-xl font-bold ml-2">News & Updates</h1>
          <nav>
            <Link to="/app/dashboard" className="px-3 hover:underline">
              Home
            </Link>
            <Link to="/app/news-updates" className="px-3 hover:underline">
              News
            </Link>
            <Link to="/connection/post-screen" className="px-3 hover:underline">
              Community
            </Link>
            <Link to="/app/jobs" className="px-3 hover:underline">
              Jobs
            </Link>
            <Link to="/app/projects" className="px-3 hover:underline">
              Projects
            </Link>
          </nav>
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
          <p className="text-gray-700 mb-4">{news.description}</p>
          <a
            href={news.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-customBlue mt-2 block"
          >
            Read more...
          </a>
        </div>
      </main>
    </div>
  );
};

export default DetailedNewsPage;
