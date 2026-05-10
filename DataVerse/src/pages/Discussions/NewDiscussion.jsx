import React, { useState } from 'react';
import { FaTags, FaLightbulb } from 'react-icons/fa';
import { createDiscussion } from '../../api/discussion';
import Loader from "../../components/Loader";
import { toast } from 'react-toastify';
const categories = ['Data Science', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'];
const tags = ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn', 'PyTorch', 'Data Preprocessing'];

const StartNewDiscussion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      alert("Please fill in both the title and description.");
      return;
    }
  
    if (selectedTags.length > 3) {
      alert("You can select up to 3 tags only.");
      return;
    }
  
    const discussionData = {
      title,
      content: description,
      tags: selectedTags,
      category,
    };
  
    setLoading(true);
  
    try {
      const response = await createDiscussion(discussionData); 
  
      if (response) {
        toast.success("Discussion Started Successfully!");
        setTitle("");
        setDescription("");
        setSelectedTags([]);
        setCategory(categories[0]);
      } else {
        alert(response.message || "Failed to post the discussion.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-max max-w-screen-lg bg-gray-100 p-8 font-sans">
      {/* Page Header */}
      <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Start a New Discussion</h1>
        <p className="text-lg mt-2">Share your thoughts or ask questions. Your peers are here to help!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Discussion Form */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create Your Discussion</h2>

          <label className="block mb-2 text-gray-600">Discussion Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your discussion title..."
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <label className="block mb-2 text-gray-600">Discussion Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Describe your topic or ask your question..."
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <label className="block mb-2 text-gray-600">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-gray-600">Tags (Select up to 3)</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagSelection(tag)}
                className={`cursor-pointer px-3 py-1 border rounded-full text-sm ${
                  selectedTags.includes(tag) ? 'bg-customBlue text-white' : 'bg-gray-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            className="bg-customBlue text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
            onClick={(e) => handleSubmit(e)}
          >
            {loading?
              <span><Loader/></span>
              :
              "Post Discussion"
            }
            
          </button>
        </div>

        {/* Preview & Best Practices */}
        <div className="col-span-1">
          {/* Live Preview */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Live Preview</h2>
            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-bold text-customBlue mb-2">
                {title || 'Discussion Title will appear here'}
              </h3>
              <p className="text-gray-600">
                {description || 'Your discussion description will appear here.'}
              </p>
              {selectedTags.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {selectedTags.map((tag) => (
                    <span key={tag} className="bg-gray-200 text-sm px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Best Practices</h2>
            <ul className="list-disc pl-4 text-gray-600 space-y-2">
              <li>
                <FaLightbulb className="inline-block text-yellow-400 mr-2" />
                Be clear and concise with your title.
              </li>
              <li>
                <FaLightbulb className="inline-block text-yellow-400 mr-2" />
                Provide enough context in the description to help others understand your query.
              </li>
              <li>
                <FaLightbulb className="inline-block text-yellow-400 mr-2" />
                Use relevant tags to categorize your discussion better.
              </li>
              <li>
                <FaLightbulb className="inline-block text-yellow-400 mr-2" />
                Engage with replies to foster collaboration.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related/Trending Discussions Section */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-bold mb-4">Similar/Trending Discussions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder discussions */}
          {/* <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-bold text-customBlue">Hyperparameter Tuning Best Practices</h3>
            <p className="text-sm text-gray-600">Deep Learning • 10 replies • 200 views</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-bold text-customBlue">Data Cleaning Techniques in Python</h3>
            <p className="text-sm text-gray-600">Machine Learning • 8 replies • 150 views</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-bold text-customBlue">Best Practices for Model Evaluation</h3>
            <p className="text-sm text-gray-600">Data Science • 12 replies • 300 views</p>
          </div>
        </div> */}
      {/* </div> */} 
    </div>
  );
};

export default StartNewDiscussion;
