// import React from "react";
// import "./index.css";
// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";
// import GlobalLayout from "./layout/GlobalLayout";
// import Landing from "./pages/landing";
// import Profiling from "./pages/profiling";
// import Dashboard from "./pages/dashboard";
// import Courses from "./pages/courses";
// import Catalog from "./pages/coursecatalog";
// import UserProfile from "./pages/userprofile";
// import Jobs from "./pages/Jobs/Jobs";
// import DatasetsScreen from "./pages/Datasets/DatasetsScreen";
// import CourseScreen from "./pages/courseScreen";

// export const routes = createBrowserRouter([
//     {
//       path: "/app",
//       element: <GlobalLayout/>,
//       children: [
//         {
//           path: "/app/landing",
//           element: <Landing/>,
//         },
//         {
//           path: "/app/register",
//           element: <Profiling/>,
//         },
//         {
//           path: "/app/dashboard",
//           element: <Dashboard/>,
//         },
//         {
//           path: "/app/courses",
//           element: <Courses/>,
//         },
//         {
//           path: "/app/courses/catalog",
//           element: <Catalog/>,
//         },
//         {
//           path: "/app/courses/course-screen",
//           element: <CourseScreen/>,
//         },
//         {
//           path: "/app/userprofile",
//           element: <UserProfile/>,
//         },
//         {
//           path: "/app/jobs",
//           element: <Jobs/>,
//         },
//         {
//           path: "/app/datasets",
//           element: <DatasetsScreen/>,
//         },
//       ]
//     },

//   ]);

import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import Landing from "./pages/landing";
import Profiling from "./pages/profiling";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Catalog from "./pages/coursecatalog";
import UserProfile from "./pages/userprofile";
import DatasetsScreen from "./pages/Datasets/DatasetsScreen";
import CourseScreen from "./pages/courseScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import LessonScreen from "./pages/lessonScreen";

import JobBoardLanding from "./pages/Jobs/JobBoardLanding";

import CourseLayout from "./layout/CourseLayout";
import VideoScreen from "./pages/videoScreen";
import CodeScreen from "./pages/codeScreen";
import SettingsScreen from "./pages/settingsScreen";
import EditProfile from "./pages/editProfileScreen";
import PostScreen from "./pages/Connections/PostScreen";
import ConnectionScreen from "./pages/Connections/ConnectionScreen";
import ConnectionLayout from "./layout/ConnectionLayout";
import NetworkScreen from "./pages/Connections/NetworkScreen";
import MessagingScreen from "./pages/Connections/MessagingScreen";
import NotificationScreen from "./pages/Connections/NotificationScreen";
import ViewAllConnections from "./pages/Connections/ViewAllConnections";
import DiscussionScreen from "./pages/Discussions/DiscussionScreen";
import MainDiscussionPage from "./pages/Discussions/DiscussionScreen";
import DiscussionDetail from "./pages/Discussions/DiscussionDetail";
import YourDiscussions from "./pages/Discussions/YourDiscussions";
import StartNewDiscussion from "./pages/Discussions/NewDiscussion";
import UserPostScreen from "./pages/Connections/UserPostScreen";
import NewsAndUpdates from "./pages/News&Updates/NewsAndUpdates";
import ProjectCollabDashboard from "./pages/ProjectCollab/ProjectCollabDashboard";
import DetailedNewsPage from "./pages/News&Updates/DetailedNewsPage";
import ProjectsScreen from "./pages/ProjectCollab/ProjectsScreen";
import NewDatasetScreen from "./pages/Datasets/NewDatasetScreen";
import DatasetDetails from "./pages/Datasets/DatasetDetails";
import ProjectBoard from "./pages/ProjectCollab/ProjectBoard";
import DataverRankings from "./pages/Progression/DataverseRankings";
import NotesScreen from "./pages/NotesScreen";
import MCQScreen from "./pages/MCQscreen";
import JobDetail from "./pages/Jobs/JobDetail";



export const routes = createBrowserRouter([
  {
    path: "/app",
    element: <GlobalLayout />,
    children: [
      {
        path: "/app/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/courses/catalog",
        element: (
          <ProtectedRoute>
            <Catalog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/courses/course-screen/:courseId",
        element: (
          <ProtectedRoute>
            <CourseScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/connection-screen",
        element: (
          <ProtectedRoute>
            <ConnectionScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/userprofile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/discussions",
        element: (
          <ProtectedRoute>
            <MainDiscussionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/discussion/:id",
        element: (
          <ProtectedRoute>
            <DiscussionDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/rankings",
        element: (
          <ProtectedRoute>
            <DataverRankings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/your-discussions",
        element: (
          <ProtectedRoute>
            <YourDiscussions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/new-discussion",
        element: (
          <ProtectedRoute>
            <StartNewDiscussion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/datasets",
        element: (
          <ProtectedRoute>
            <DatasetsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/dataset-details/:id",
        element: (
          <ProtectedRoute>
            <DatasetDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/datasets/new-dataset",
        element: (
          <ProtectedRoute>
            <NewDatasetScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/news-updates",
        element: (
          <ProtectedRoute>
            <NewsAndUpdates />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/news-updates/detailed-news",
        element: (
          <ProtectedRoute>
            <DetailedNewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/jobs",
        element: (
          <ProtectedRoute>
            <JobBoardLanding />
          </ProtectedRoute>
        ),
      },
      {
        path: `/app/jobs/detail/:jobId`,
        element: (
          <ProtectedRoute>
            <JobDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/project-collaboration",
        element: (
          <ProtectedRoute>
            <ProjectCollabDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/projects",
        element: (
          <ProtectedRoute>
            <ProjectsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/project-board",
        element: (
          <ProtectedRoute>
            <ProjectBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/settings",
        element: (
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/settings/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/app/courses/lesson-screen",
    element:
      (
        <ProtectedRoute>
          <LessonScreen />
        </ProtectedRoute>
      )
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Profiling />,
  },
  {
    path: "/course-started",
    element: <CourseLayout />,
    children: [
      {
        path: "/course-started/video-screen/:courseId/:index",
        element: <VideoScreen />,
      },
      {
        path: "/course-started/code-screen/:courseId/:index",
        element: <CodeScreen />,
      },
      {
        path: "/course-started/mcq-screen/:courseId/:index",
        element: <MCQScreen />,
      },
      {
        path: "/course-started/notes-screen/:courseId/:index",
        element: <NotesScreen />,
      },
    ],
  },
  {
    path: "/connection",
    element: (
      <ProtectedRoute>
        <ConnectionLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/connection/post-screen",
        element: (
          <ProtectedRoute>
            <PostScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connection/post-screen/user/:userId",
        element: (
          <ProtectedRoute>
            <UserPostScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connection/networks-screen",
        element: (
          <ProtectedRoute>
            <NetworkScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connection/messaging-screen",
        element: (
          <ProtectedRoute>
            <MessagingScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connection/notifications-screen",
        element: (
          <ProtectedRoute>
            <NotificationScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connection/view-all-connections",
        element: (
          <ProtectedRoute>
            <ViewAllConnections />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
