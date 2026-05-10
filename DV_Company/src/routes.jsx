import React from "react";
import "./index.css";
import GlobalLayoutAdmin from "./layout/GlobalLayoutAdmin";

import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/Company/Dashboard";
import AdminLogin from "./pages/Company/CompanyLogin";
import ViewStudentTimetable from "./pages/Company/ViewStudentTimetable";
import ViewStudentProfile from "./pages/Company/ViewStudentProfile";
import ViewTeacherTimetable from "./pages/Company/ViewTeacherTimetable";
import ViewTeacherProfile from "./pages/Company/ViewTeacherProfile";
import StudentPage from "./pages/Company/ApplicationPage";
import ParentPage from "./pages/Company/ParentPage";
import TeacherPage from "./pages/Company/TeacherPage";
import ReviewClass from "./pages/Company/ReviewClass";
import ScheduleClassPage from "./pages/Company/JobsPage";
import WellbeingPage from "./pages/Company/AboutUsPage";
import NewWellBeing from "./pages/Company/NewWellBeing";
import AdminSettingsPage from "./pages/Company/AdminSettingsPage";
import CompanyLogin from "./pages/Company/CompanyLogin";
import SettingsScreen from "./pages/Settings/SettingsPage";
import EditProfileScreen from "./pages/Settings/EditProfileScreen";
import ApplicationPage from "./pages/Company/ApplicationPage";
import JobsPage from "./pages/Company/JobsPage";
import AboutUsPage from "./pages/Company/AboutUsPage";
import UserSupportScreen from "./pages/Support/UserSupportScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const routes = [
  {
    path: "/company",
    element: <GlobalLayoutAdmin />,
    children: [
      {
        path: "/company/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/applications",
        element: (
          <ProtectedRoute>
            <ApplicationPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/company/students/view-student-timetable",
      //   element: <ProtectedRoute><ViewStudentTimetable /></ProtectedRoute>,
      // },
      // {
      //   path: "/company/students/view-student-profile",
      //   element: <ProtectedRoute><ViewStudentProfile /></ProtectedRoute>,
      // },
      {
        path: "/company/teachers",
        element: (
          <ProtectedRoute>
            <TeacherPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/company/teachers/view-teacher-timetable",
      //   element: <ProtectedRoute><ViewTeacherTimetable /></ProtectedRoute>,
      // },
      // {
      //   path: "/company/teachers/view-teacher-profile",
      //   element: <ProtectedRoute><ViewTeacherProfile /></ProtectedRoute>
      // },
      // {
      //   path: "/company/teachers/review-class",
      //   element: <ProtectedRoute><ReviewClass /></ProtectedRoute>,
      // },
      {
        path: "/company/parents",
        element: (
          <ProtectedRoute>
            <ParentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/jobs",
        element: (
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/about",
        element: (
          <ProtectedRoute>
            <AboutUsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/wellbeing/new-wellbeing",
        element: (
          <ProtectedRoute>
            <NewWellBeing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/support",
        element: (
          <ProtectedRoute>
            <UserSupportScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/settings",
        element: (
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "/company/settings/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfileScreen />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <CompanyLogin />,
  },
];
