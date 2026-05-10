import {IMAGES} from "../assets"

export const postsContent = [
    {
      id: 1,
      author: "Zaki Mazhar",
      profileImg: IMAGES.avatar,
      content: "Excited to share that I’ve completed my latest project on AI!",
      timestamp: "2h ago",
      likes: 12,
      comments: 4,
      shares: 2,
      imageUrl: IMAGES.image1, // Image URL for the post
      comments: [
        {
          profileImg: IMAGES.avatar3,
          author: 'Jane Smith',
          timestamp: '1 hour ago',
          content: 'This is a sample comment',
        },
        {
          profileImg:  IMAGES.avatar8,
          author: 'Jane Smith',
          timestamp: '1 hour ago',
          content: 'This is a sample comment',
        },
    ],
    showComments: true,
    },
    {
      id: 2,
      author: "Sara Ali",
      profileImg: IMAGES.avatar4,
      content:
        "Check out this amazing opportunity at XYZ Inc. #JobOpportunity",
      timestamp: "5h ago",
      likes: 34,
      comments: 10,
      shares: 5,
      imageUrl: null, // Image URL for the post
      comments: [
        {
          profileImg: IMAGES.avatar4,
          author: 'Jane Smith',
          timestamp: '1 hour ago',
          content: 'This is a sample comment',
        },
      ],
    showComments: true,
    },
    {
      id: 3,
      author: "Sara Ali",
      profileImg: IMAGES.avatar4,
      content:
        "Check out this amazing opportunity at XYZ Inc. #JobOpportunity",
      timestamp: "5h ago",
      likes: 34,
      comments: 10,
      shares: 5,
      imageUrl: IMAGES.course_cover, // Image URL for the post
      comments: [],
    showComments: false,
    },
    {
      id: 4,
      author: "Sara Ali",
      profileImg: IMAGES.avatar4,
      content:
        "Check out this amazing opportunity at XYZ Inc. #JobOpportunity",
      timestamp: "5h ago",
      likes: 34,
      comments: 10,
      shares: 5,
      imageUrl: "https://via.placeholder.com/400x300", // Image URL for the post
      comments: [],
    showComments: false,
    },
  ]