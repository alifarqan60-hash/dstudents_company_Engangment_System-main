import React from 'react';
import { useNavigate } from 'react-router-dom';

const followedDiscussionsData = [
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
  // Add more followed discussions
];

const FollowedDiscussions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-customBlue text-white p-6 rounded-md shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Followed Discussions</h1>
        <p className="text-lg mt-2">Manage the discussions you are following.</p>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-customBlue mb-4">Your Followed Discussions</h2>
        {followedDiscussionsData.map((discussion) => (
          <div
            key={discussion.id}
            className="border-b last:border-b-0 py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div>
                <h3 className="text-lg font-bold text-customBlack">{discussion.title}</h3>
                <p className="text-gray-600">Started by {discussion.author}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-500">{discussion.replies} replies</p>
              <button
                onClick={() => navigate(`/app/discussion`)}
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

export default FollowedDiscussions;
