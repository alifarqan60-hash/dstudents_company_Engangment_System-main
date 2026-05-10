import React, { useEffect, useState } from "react";
import EditProfileModal from "../../components/Profile/EditProfileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaImage, FaVideo, FaTimes, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

import { IMAGES } from "../../assets";
import { MdGroups } from "react-icons/md";
import { postsContent } from "../../constants/postsContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/auth/AuthSlice";
import { fetchUserProgress } from "../../redux/course/ProgressSlice";
import { useNavigate } from "react-router-dom";
import { cloudname, preset } from "../../config/cloudinary";
import axios from "axios";
import { addComment, createPost, decrementUpVotePost, getAllPosts, upVotePost } from "../../api/post";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const PostScreen = () => {
  const navigate = useNavigate();
  const [postStates, setPostStates] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
    imgUrl: "",
  });
  const [commentLoading, setCommentLoading] = useState(false)


  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [profileDetails, setProfileDetails] = useState({
    ...user,
    linkedIn_Acc: "https://linkedin.com",
    twitter_Acc: "https://twitter.com",
    github_Acc: "https://github.com"
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleVideoUpload = (e) => {
    setSelectedVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postContent.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    try {
      let imageUrl = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", preset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
          formData
        );

        imageUrl = response.data.secure_url;
      }

      const postData = {
        description: postContent,
        imgUrl: imageUrl,
      };

      await createPost(postData)

      toast.success("Post Created Successfully!");
      setPostContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image or submit post.");
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
  };

  const handleCancelVideo = () => {
    setSelectedVideo(null);
  };

  const handleLikeToggle = async (postId, post) => {
    try {
      const isUpvoted = post.upVotes.includes(user._id);
      const response = isUpvoted
        ? await decrementUpVotePost(postId)
        : await upVotePost(postId);

      if (response) {
        setPostStates((prevPosts) =>
          prevPosts.map((p) =>
            p._id === postId
              ? { ...p, upVotes: response.upVotes }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const handleCommentToggle = (postId) => {
    setPostStates((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    try {
      setCommentLoading(true)
      const data = {
        content: newComment.content,
        username: user.username,
        imgUrl: user.imgUrl,
      }

      const response = await addComment(data, postId);

      if (!response) {
        throw new Error("Failed to add comment");
      }

      const updatedPost = response.updatedPost;

      setPostStates((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id
            ? { ...post, comments: updatedPost.comments }
            : post
        )
      );

      setNewComment({
        content: "",
        imgUrl: "",
      });
      setCommentLoading(false)

    } catch (error) {
      console.error(error);
    }
    finally {
      setCommentLoading(false)
    }
  };


  const handleProfileClick = (id) => {
    if (id) {
      navigate(`/connection/post-screen/user/${id}`);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfileDetails(updatedProfile);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchUserDetails()).unwrap();
        setProfileDetails({
          ...response,
        });
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    };

    if (!user) {
      fetchData();
    } else {
      setProfileDetails({
        ...user,
        linkedIn_Acc: "https://linkedin.com",
        twitter_Acc: "https://twitter.com",
        github_Acc: "https://github.com"
      });
    }
  }, [user, dispatch]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPosts();
      setPostStates(response)
    }
    fetchPosts();
  }, [])
  return (
    <div className="flex flex-col h-screen ">
      <div className="flex p-2">
        {/* Left Sidebar */}
        <div className="bg-gray-100 p-6 shadow-lg rounded-md mx-10 flex-[2]">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.imgUrl || "https://robohash.org/placeholder-avatar"}
              alt="avatar"
              className="w-20 h-20 rounded-full mb-3 shadow-md"
            />
            <h3 className="font-semibold text-lg">{user?.username}</h3>
            <p className="text-sm text-gray-500 ">Student at XYZ</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              <span>{profileDetails.location}</span>
            </div>
            {/* <button
              onClick={handleEditClick}
              className="px-3 py-1 bg-customBlue text-white rounded-full text-sm hover:bg-blue-600 transition"
            >
              Edit Profile
            </button> */}
          </div>

          {/* Profile Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Profile Summary</h2>
            <p className="text-sm text-gray-600">{profileDetails.title}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Skills</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              {Array.isArray(profileDetails?.skills) ? (
                profileDetails.skills.map((skill, index) => (
                  <li key={index}>- {skill.trim()}</li>
                ))
              ) : (
                profileDetails?.skills?.split(",")?.map((skill, index) => (
                  <li key={index}>- {skill.trim()}</li>
                ))
              )}
            </ul>
          </div>

          {/* Connections Section */}
          <div onClick={() => navigate("/connection/view-all-connections")} className="font-bold flex justify-between text-sm mb-5 text-customBlue hover:underline cursor-pointer">
            <p>Connections</p>
            <p>{user?.friends.length}</p>
          </div>

          {/* <div className="flex flex-col gap-4 text-sm">
                <p className="font-bold text-customBlue text-base">Socials</p>
                <a href={profileDetails.linkedIn_Acc} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-theme hover:underline">
                  <FaLinkedin className="text-blue-700 text-xl hover:text-blue-800 transition" />
                  <p>{profileDetails.linkedIn_Acc}</p>
                </a>
                <a href={profileDetails.twitter_Acc} target="_blank" rel="noopener noreferrer"  className="flex items-center gap-2 text-theme hover:underline">
                  <FaTwitter className="text-blue-400 text-xl hover:text-blue-500 transition" />
                  <p>{profileDetails.twitter_Acc}</p>
                </a>
                <a href={profileDetails.github_Acc} target="_blank" rel="noopener noreferrer"  className="flex items-center gap-2 text-theme hover:underline">
                  <FaGithub className="text-gray-800 text-xl hover:text-gray-900 transition" />
                  <p>{profileDetails.github_Acc}</p>
                </a>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="flex-[4]">
          {/* Post Input Section */}
          <div className="bg-white p-6 shadow-lg rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Start a Post</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                name="postContent"
                className="w-full p-3 border rounded-md mb-4"
                placeholder="Share what's on your mind..."
                rows="3"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="flex items-center mb-4">
                <label className="flex items-center cursor-pointer mr-4">
                  <FaImage className="text-blue-500 mr-2" />
                  <span className="text-blue-500 hover:underline">
                    Add Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {/* <label className="flex items-center cursor-pointer">
                  <FaVideo className="text-blue-500 mr-2" />
                  <span className="text-blue-500 hover:underline">
                    Add Video
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label> */}
              </div>

              {selectedImage && (
                <div className="mt-4 relative">
                  <p className="text-sm text-gray-500">Selected Image:</p>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full h-auto rounded-md mt-2"
                  />
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
                    onClick={handleCancelImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {selectedVideo && (
                <div className="mt-4 relative">
                  <p className="text-sm text-gray-500">Selected Video:</p>
                  <video controls className="w-full h-auto rounded-md mt-2">
                    <source
                      src={URL.createObjectURL(selectedVideo)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
                    onClick={handleCancelVideo}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 bg-customBlue text-white rounded-md hover:bg-blue-600 transition"
              >
                Post
              </button>
            </form>
          </div>

          {/* Post Feed */}
          {postStates?.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 shadow-lg rounded-md mb-6"
            >
              <div
                onClick={() => handleProfileClick(post.userId?._id)}
                className="flex items-center mb-4 cursor-pointer"
              >
                {post.userId.imgUrl ?
                  <img
                    src={post.userId.imgUrl}
                    alt={`${post.author} avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  :
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-customBlue font-bold text-2xl">
                      {post.userId.username.at(0).toUpperCase()}
                    </span>
                  </div>
                }
                <div className="ml-4">
                  <p className="font-bold">{post.userId.username}</p>
                  {/* <p className="text-sm text-gray-500">{post.timestamp}</p> */}
                </div>
              </div>
              <p className="mb-4">{post.description}</p>

              {post.imgUrl && (
                <img
                  src={post.imgUrl}
                  alt="Post content"
                  className="w-full h-auto rounded-md mb-4"
                />
              )}

              <div className="flex items-center space-x-4 text-gray-500">
                <div
                  className={`flex items-center space-x-1 cursor-pointer ${post.upVotes.includes(user._id) ? "text-blue-500" : ""
                    }`}
                  onClick={() => handleLikeToggle(post._id, post)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>{post.upVotes.length}</span>
                </div>
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleCommentToggle(post._id)}
                >
                  <FontAwesomeIcon icon={faComment} />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {post.showComments && (
                <div className="mt-4">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="flex items-start mb-4">
                      <img
                        src={comment.imgUrl || "https://robohash.org/placeholder-avatar"} // Fallback for missing avatar
                        alt={`${comment.username} avatar`}
                        className="w-8 h-8 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-bold">{comment.username}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()} {/* Display comment timestamp */}
                        </p>
                        <p className="mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  <form onSubmit={(e) => handleAddComment(e, post._id)} className="mt-4">
                    <textarea
                      name="commentContent"
                      value={newComment.content}
                      onChange={(e) =>
                        setNewComment({ ...newComment, content: e.target.value })
                      }
                      className="w-full p-2 border rounded-md resize-none"
                      placeholder="Add a comment..."
                      rows="2"
                      required

                    />
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-customBlue text-white rounded-md hover:bg-blue-600 transition"
                    >
                      {commentLoading ? <span><Loader /></span> : "Comment"}
                    </button>
                  </form>
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-4 shadow-md rounded-md mx-10 flex-[2]">
          {/* Popular Topics */}
          <h2 className="text-lg font-bold mb-4">Popular Topics</h2>
          <ul className="mb-6">
            <li>#AI</li>
            <li>#JobOpportunities</li>
            <li>#MachineLearning</li>
          </ul>

          {/* Trending Articles */}
          <h2 className="text-lg font-bold mb-4">Trending Articles</h2>
          <ul className="mb-6">
            <li className="text-blue-600 cursor-pointer hover:underline">
              <a
                href="https://www.iqvia.com/blogs/2024/02/the-future-of-ai-in-healthcare"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Future of AI in Healthcare
              </a>
            </li>
            <li className="text-blue-600 cursor-pointer hover:underline">
              <a
                href="https://www.kdnuggets.com/5-essential-skills-every-data-scientist-needs-in-2024"
                target="_blank"
                rel="noopener noreferrer"
              >
                5 Must-Have Skills for Data Scientists
              </a>
            </li>
            <li className="text-blue-600 cursor-pointer hover:underline">
              <a
                href="https://www.elastic.co/blog/popular-ml-algorithms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Exploring Popular Machine Learning Algorithms
              </a>
            </li>
          </ul>

          {/* Recommended Connections */}
          {/* <h2 className="text-lg font-bold mb-4">Recommended Connections</h2>
          <div className="space-y-4">
            <div
              onClick={handleProfileClick}
              className="flex items-center cursor-pointer"
            >
              <img
                src={IMAGES.avatar4}
                alt="Connection 1"
                className="w-8 h-8 rounded-full mr-3"
              />
              <p className="text-sm font-semibold">Jane Smith</p>
            </div>
            <div
              onClick={handleProfileClick}
              className="flex items-center cursor-pointer"
            >
              <img
                src={IMAGES.avatar5}
                alt="Connection 2"
                className="w-8 h-8 rounded-full mr-3 "
              />
              <p className="text-sm font-semibold ">John Doe</p>
            </div>
            <div
              onClick={handleProfileClick}
              className="flex items-center cursor-pointer"
            >
              <img
                src={IMAGES.avatar6}
                alt="Connection 3"
                className="w-8 h-8 rounded-full mr-3"
              />
              <p className="text-sm font-semibold">Alex Johnson</p>
            </div>
          </div> */}
        </div>
      </div>

      {user && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profileDetails={{ ...user, ...profileDetails }}
          onSave={handleSaveProfile}
          skills={user?.skills}
          name={user?.username}
        />
      )}
    </div>
  );
};

export default PostScreen;
