import React, { useEffect, useState } from 'react';
import { FaComments, FaFire, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { getAllDiscussion, getTrendingDiscussions } from '../../api/discussion';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const discussionsData = [
  {
    id: 1,
    title: 'How to improve model accuracy for classification tasks?',
    author: 'John Doe',
    replies: 12,
    tags: ['Machine Learning', 'Classification', 'Model Tuning'],
    lastReply: '2 hours ago',
  },
  {
    id: 2,
    title: 'Best practices for handling large datasets in Python',
    author: 'Alice Williams',
    replies: 8,
    tags: ['Data Processing', 'Python', 'Pandas'],
    lastReply: '1 day ago',
  },
  // Add more discussions
];

const DiscussionMainPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getAllDiscussion();
        const response2 = await getTrendingDiscussions();
        if (response&&response2) {
          setDiscussions(response.discussions);
          setTrending(response2.trendingDiscussions);
        } else {
          const errorData = response
          setError(errorData.message || "Failed to fetch discussions.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);


  return (
    <div className="max-h-max w-full bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-customBlue text-white p-6 rounded-md shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Discussions</h1>
        <div className="flex items-center space-x-4">
          {/* <input
            type="text"
            className="p-2 rounded-md text-black"
            placeholder="Search discussions..."
          /> */}
          <button
            onClick={() => navigate('/app/your-discussions')}
            className="bg-white text-customBlue font-semibold border-2 border-theme px-4 py-2 rounded-md hover:bg-blue-100 transition"
          >
            Your Discussions
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-white p-6 rounded-md shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-customDarkBlue mb-4 flex items-center">
          <FaFire className="mr-2" /> Trending Discussions
        </h2>
        <div className="flex space-x-6 overflow-x-auto no-scrollbar p-2">
          {loading && <Loader/>}
          {trending.map((discussion) => (
            <div key={discussion._id} className="bg-gray-50 p-4 rounded-md shadow-md w-72 flex-shrink-0">
              <h3 className="text-lg font-bold mb-2 cursor-pointer text-customDarkBlue"
              onClick={() => navigate(`/app/discussion/${discussion._id}`) }
              >{discussion.title}</h3>
              <p className="text-gray-600">by {discussion.author.username}</p>
              <div className="flex space-x-2 mt-2">
                {discussion.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">{discussion.replies.length} replies
              </p>
              {discussion.replies.length>0 && <p className="text-sm text-gray-400 mt-4">
                 Last reply {discussion.lastReplyAt
                  ? formatDistanceToNow(new Date(discussion.lastReplyAt), { addSuffix: true })
                  : ''}
              </p>
              }
              
            </div>
          ))}
        </div>
      </div>

      {/* Discussion List */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-customDarkBlue mb-4">All Discussions</h2>
        {loading && <Loader/>}
        {discussions?.map((discussion) => (
        <div
          key={discussion._id}
          className="border-b last:border-b-0 py-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <FaUserCircle className="text-gray-500 w-8 h-8 mr-4" />
            <div>
              <h3 className="text-lg font-bold text-customBlack">{discussion.title}</h3>
              {/* Displaying author's username */}
              <p className="text-gray-600">Started by {discussion.author?.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-500">{discussion.replies?.length || 0} replies</p>
            <button
              onClick={() => navigate(`/app/discussion/${discussion._id}`)}
              className="text-customBlue underline"
            >
              View Discussion
            </button>
          </div>
        </div>
      ))}

      </div>
    </div>
  );
};

export default DiscussionMainPage;
