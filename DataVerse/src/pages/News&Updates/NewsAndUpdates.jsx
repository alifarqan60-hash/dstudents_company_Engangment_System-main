// import React, { useEffect } from 'react';
// import Loader from "../../components/Loader";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchNews } from '../../redux/news/newsSlice';

// const NewsAndUpdates = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const newsData = useSelector((state) => state.news.news);
//   const loading = useSelector((state) => state.news.status === 'loading');
//   const error = useSelector((state) => state.news.error);

//   useEffect(() => {
//     const fetchNewsData = async () => {
//       try {
//         await dispatch(fetchNews()).unwrap();  // Unwrapping to handle errors
//       } catch (err) {
//         console.error('Error fetching news:', err);
//       }
//     };

//     if (!newsData) {
//       fetchNewsData();
//     }
//   }, [dispatch, newsData]);

//   const handleNewsClick = (news) => {
//     navigate(`/app/news-updates/detailed-news`, { state: { news } });
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Error loading news: {error}</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-customDarkBlue2 text-white py-4 rounded-2xl">
//         <div className="container mx-auto flex justify-between items-center px-3">
//           <h1 className="text-xl font-bold ml-2">News & Updates</h1>
//           <nav>
//             <a href="/" className="px-3 hover:underline">Home</a>
//             <a href="/news" className="px-3 hover:underline">News</a>
//             <a href="/community" className="px-3 hover:underline">Community</a>
//             <a href="/jobs" className="px-3 hover:underline">Jobs</a>
//             <a href="/projects" className="px-3 hover:underline">Projects</a>
//           </nav>
//         </div>
//       </header>

//       <main className="container mx-auto py-10">
//         <section className="mb-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {newsData && newsData.length > 0 ? (
//               <>
//                 <div onClick={() => handleNewsClick(newsData[0])} className="relative cursor-pointer">
//                   <img
//                     src={newsData[0].imgUrl}
//                     alt="Featured News"
//                     className="w-full h-64 object-cover rounded-md"
//                   />
//                   <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
//                     <h2 className="text-xl font-bold">{newsData[0].title}</h2>
//                     <p>{newsData[0].description}</p>
//                     <p className="text-sm mt-2">{newsData[0].category}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   {newsData.slice(1).map((item, index) => (
//                     <div key={index} onClick={() => handleNewsClick(item)} className="relative cursor-pointer">
//                       <img src={item.imgUrl} alt="News" className="w-full h-32 object-cover rounded-md" />
//                       <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
//                         <h3 className="font-bold text-lg">{item.title}</h3>
//                         <p className="text-sm">{item.category}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <Loader />
//             )}
//           </div>
//         </section>

//         {/* News Grid Section */}
//         <section className="mb-10">
//           <h3 className="text-2xl font-bold text-customDarkBlue mb-6">Latest Articles</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {newsData?.map((item, index) => (
//               <div key={index} onClick={() => handleNewsClick(item)} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer">
//                 <img src={item.imgUrl} alt="Article" className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg">{item.title}</h3>
//                   <p className="text-gray-600">{item.description}</p>
//                   <p className="text-customDarkBlue mt-2">{item.category}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Upcoming Events Section */}
//         <section className="bg-customDarkBlue2 text-white p-6 rounded-md">
//           <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
//           <ul>
//             <li className="mb-2">
//               <strong>Hackathon 2024:</strong> Join the latest hackathon event. Date: 10th October 2024.
//             </li>
//             <li className="mb-2">
//               <strong>AI Conference:</strong> Explore the latest advancements in AI. Date: 15th November 2024.
//             </li>
//             <li className="mb-2">
//               <strong>Data Science Workshop:</strong> An in-depth workshop on data science practices. Date: 5th December 2024.
//             </li>
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default NewsAndUpdates;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const NewsAndUpdates = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/news");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNewsData(Array.isArray(data) ? data : []);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching news:", error);
      // Keep existing data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Fetch news from Flask API and setup polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleNewsClick = (news) => {
    navigate(`/app/news-updates/detailed-news`, { state: { news } });
  };

  return (
    <div className="bg-gray-100 min-h-screen max-w-screen-lg min-w-full">
      {/* Header */}
      <header className="bg-customBlue text-white py-4 px-6 rounded-2xl shadow-lg mb-6 mx-2">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">News & Updates</h1>
            {lastUpdated && (
              <p className="text-xs text-blue-100 opacity-80 mt-1">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-2">
        {/* News Grid Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-customDarkBlue mb-6">
            Latest Articles
          </h3>
          {loading && <div className="text-blue-800 w-full h-full flex items-center justify-center"><Loader /> </div>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {!loading &&
              newsData.map((item, index) => (
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
                    <a
                      href={item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-customDarkBlue mt-2 block"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsAndUpdates;
