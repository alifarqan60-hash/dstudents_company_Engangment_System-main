import {IMAGES} from "../assets"

export const notificationContent = [
    {
      id: 1,
      type: "connection",
      name: "Jane Smith",
      message: "wants to connect with you.",
      avatar: IMAGES.avatar4,
      timestamp: "2 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "like",
      name: "Mark Stevens",
      message: "liked your post.",
      avatar: IMAGES.avatar5,
      timestamp: "5 minutes ago",
      isRead: true,
    },
    {
      id: 3,
      type: "comment",
      name: "Alice Johnson",
      message: "commented on your post.",
      avatar: IMAGES.avatar6,
      timestamp: "10 minutes ago",
      isRead: false,
    },
    {
      id: 4,
      type: "mention",
      name: "John Doe",
      message: "mentioned you in a comment.",
      avatar: IMAGES.avatar7,
      timestamp: "15 minutes ago",
      isRead: true,
    },
  ]