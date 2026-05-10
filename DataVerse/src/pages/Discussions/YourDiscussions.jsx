import React, { useState, useEffect } from 'react';
import { FaComments, FaSort, FaFilter, FaEye, FaThumbsUp } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';
import FollowedDiscussions from './FollowDiscussionPage'; // Import the FollowedDiscussions component
import { getMyDiscussions } from '../../api/discussion';
import { formatDistanceToNow } from 'date-fns';

const yourDiscussionsData = [
  {
    id: 1,
    title: 'Optimizing Hyperparameters for Deep Learning Models',
    replies: 25,
    views: 300,
    likes: 50,
    tags: ['Deep Learning', 'Optimization'],
    lastReply: '1 hour ago',
  },
  {
    id: 2,
    title: 'Best Practices for Data Preprocessing in Machine Learning',
    replies: 18,
    views: 250,
    likes: 42,
    tags: ['Machine Learning', 'Data Preprocessing'],
    lastReply: '2 days ago',
  },

];

const YourDiscussions = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('yourDiscussions'); 
  const [loading, setLoading] = useState(true);
  const [yourDiscussions, setYourDiscussions] = useState([]);
  const [error, setError] = useState([]);
  

  useEffect(() => {
    const fetchMyDiscussions = async () => {
      try {
        const response = await getMyDiscussions();
        
        if (response) {
          console.log(response)
          setYourDiscussions(response.myDiscussions);
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

    fetchMyDiscussions();
  }, []);  

  return (
    <div className="min-h-screen bg-gray-100 p-8 w-full font-sans">
      {/* Header */}
      <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Your Discussions</h1>
        <p className="text-lg mt-2">Review, manage, and engage with the discussions you've started or followed.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        {/* <div className="flex space-x-4">
          <button
            onClick={() => setView('yourDiscussions')}
            className={`px-4 py-2 rounded-md shadow ${view === 'yourDiscussions' ? 'bg-customBlue text-white' : 'bg-white text-customBlue'}`}
          >
            Your Discussions
          </button>
          <button
            onClick={() => setView('followedDiscussions')}
            className={`px-4 py-2 rounded-md shadow ${view === 'followedDiscussions' ? 'bg-customBlue text-white' : 'bg-white text-customBlue'}`}
          >
            Followed Discussions
          </button>
        </div> */}
        <button
          onClick={() => navigate('/app/new-discussion')}
          className="bg-customBlue text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Start a New Discussion
        </button>
      </div>

      {/* Conditional Rendering of Discussions */}
      {view === 'yourDiscussions' ? (
        <>
          {/* User Stats Section */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-customBlue">10</h2>
              <p className="text-gray-500">Total Discussions</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-customBlue">150</h2>
              <p className="text-gray-500">Total Replies</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-customBlue">40</h2>
              <p className="text-gray-500">Total Likes</p>
            </div>
          </div> */}

          {/* Filter and Sort Section */}
          <div className="flex justify-between items-center mb-6">
            {/* <div className="flex space-x-4">
              <div className="relative">
                <select className="p-2 border rounded-md text-gray-700">
                  <option value="all">All Discussions</option>
                  <option value="active">Active Discussions</option>
                  <option value="answered">Answered Discussions</option>
                </select>
                <FaFilter className="absolute right-3 top-3 text-gray-500" />
              </div>
              <div className="relative">
                <select className="p-2 border rounded-md text-gray-700">
                  <option value="latest">Sort by Latest</option>
                  <option value="most-replied">Most Replied</option>
                  <option value="most-liked">Most Liked</option>
                </select>
                <FaSort className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div> */}
          </div>

          {/* Discussions List */}
          <div className="grid gap-6">
            {yourDiscussions?.map((discussion) => (
              <div
                key={discussion._id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border-l-4 border-customBlue"
              >
                <div>
                  <h3 className="text-xl font-bold text-customDarkBlue mb-2">{discussion.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <p>{discussion.replies.length} replies</p>
                    <p>{"50"} views</p>
                  </div>
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
                  {discussion.replies.length>0 && <p className="text-sm text-gray-400 mt-4">
                 Last reply {discussion.lastReplyAt
                  ? formatDistanceToNow(new Date(discussion.lastReplyAt), { addSuffix: true })
                  : ''}
              </p>
              }
                </div>
                {/* <div className="flex items-center space-x-4">
                  <FaComments className="text-customBlue w-6 h-6 cursor-pointer" onClick={() => navigate(`/discussion/${discussion.id}`)} />
                  <FaEye className="text-gray-400 w-6 h-6" />
                  <FaThumbsUp className="text-gray-400 w-6 h-6" />
                </div> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <FollowedDiscussions />
      )}
    </div>
  );
};

export default YourDiscussions;
