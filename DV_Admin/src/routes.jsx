import React from "react";
import "./index.css";
import GlobalLayoutAdmin from "./layout/GlobalLayoutAdmin";

import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import ViewStudentTimetable from "./pages/Admin/ViewStudentTimetable";
import ViewStudentProfile from "./pages/Admin/ViewStudentProfile";
import ViewTeacherTimetable from "./pages/Admin/ViewTeacherTimetable";
import ViewTeacherProfile from "./pages/Admin/ViewTeacherProfile";
import NewWellBeing from "./pages/Admin/NewWellBeing";
import CompanyPage from "./pages/Company/CompanyPage";
import UserPage from "./pages/User/UserPage";
import NewsAndUpdates from "./pages/NewsUpdates/News&UpdatesPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import NewDatasetScreen from "./pages/Datasets/NewDatasetScreen";
import DatasetsScreen from "./pages/Datasets/DatasetsScreen";
import DatasetDetails from "./pages/Datasets/DatasetDetails";
import DetailedNewsPage from "./pages/NewsUpdates/DetailedNewsPage";
import UserSupportScreen from "./pages/UserSupportScreen.jsx";
import SettingsScreen from "./pages/Settings/SettingsPage.jsx";
import EditProfileScreen from "./pages/Settings/EditProfileScreen.jsx";
import LessonsPage from "./pages/Courses/LessonsPage.jsx";
import QuizzesPage from "./pages/Courses/QuizzesPage.jsx";
import QuizPage from "./pages/Quizzes/QuizPage.jsx";
import CompanyDetailsPage from "./pages/Company/CompanyDetailsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

export const routes = [
  {
    path: "/admin",
    element: <GlobalLayoutAdmin />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/students/view-student-timetable",
        element: (
          <ProtectedRoute>
            <ViewStudentTimetable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/students/view-student-profile",
        element: (
          <ProtectedRoute>
            <ViewStudentProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/details",
        element: (
          <ProtectedRoute>
            <CompanyDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/teachers/view-teacher-timetable",
        element: (
          <ProtectedRoute>
            <ViewTeacherTimetable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/teachers/view-teacher-profile",
        element: (
          <ProtectedRoute>
            <ViewTeacherProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/news",
        element: (
          <ProtectedRoute>
            <NewsAndUpdates />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/news-updates/detailed-news",
        element: (
          <ProtectedRoute>
            <DetailedNewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/courses",
        element: (
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/courses/lessons",
        element: (
          <ProtectedRoute>
            <LessonsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/quizzes",
        element: (
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/courses/quizes",
        element: (
          <ProtectedRoute>
            <QuizzesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/datasets",
        element: (
          <ProtectedRoute>
            <DatasetsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dataset-details",
        element: (
          <ProtectedRoute>
            <DatasetDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/datasets/new-dataset",
        element: (
          <ProtectedRoute>
            <NewDatasetScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/support",
        element: (
          <ProtectedRoute>
            <UserSupportScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/wellbeing/new-wellbeing",
        element: (
          <ProtectedRoute>
            <NewWellBeing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/settings/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfileScreen />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <LandingPage />,
  // },
  {
    path: "/",
    element: <AdminLogin />,
  },
];
