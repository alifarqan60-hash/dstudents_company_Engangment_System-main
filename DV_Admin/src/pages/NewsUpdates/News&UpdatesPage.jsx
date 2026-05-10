import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNews } from "../../api/news";

const NewsAndUpdates = () => {
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        console.log("data", data);
        setNewsData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (news) => {
    navigate(`/admin/news-updates/detailed-news`, { state: { news } });
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

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
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <main className="container mx-auto py-10">
          {/* Featured News Section */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured News */}
              {newsData[0] && (
                <div
                  onClick={() => handleNewsClick(newsData[0])}
                  className="relative cursor-pointer"
                >
                  <img
                    src={newsData[0].imgUrl}
                    alt="Featured News"
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                    <h2 className="text-xl font-bold">{newsData[0].title}</h2>
                    <p>{newsData[0].description}</p>
                    <p className="text-sm mt-2">{newsData[0].category}</p>
                  </div>
                </div>
              )}

              {/* Additional Top News */}
              <div className="grid grid-cols-1 gap-4">
                {newsData.slice(1).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleNewsClick(item)}
                    className="relative cursor-pointer"
                  >
                    <img
                      src={item.imgUrl}
                      alt="News"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* News Grid Section */}
          <section className="mb-10">
            <h3 className="text-2xl font-bold text-customBlue mb-6">
              Latest Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNewsClick(item)}
                  className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.imgUrl}
                    alt="Article"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-customBlue mt-2">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="bg-customBlue text-white p-6 rounded-md">
            <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
            <ul>
              <li className="mb-2">
                <strong>Hackathon 2024:</strong> Join the latest hackathon
                event. Date: 10th October 2024.
              </li>
              <li className="mb-2">
                <strong>AI Conference:</strong> Explore the latest advancements
                in AI. Date: 15th November 2024.
              </li>
              <li className="mb-2">
                <strong>Data Science Workshop:</strong> An in-depth workshop on
                data science practices. Date: 5th December 2024.
              </li>
            </ul>
          </section>
        </main>
      )}
    </div>
  );
};

export default NewsAndUpdates;
