import React from 'react'
import CourseNavbar from '../components/courseNavbar';
import { Outlet } from 'react-router-dom';

export default function CourseLayout() {
    return (
        <div className="h-screen w-screen flex flex-row bg-gray-100 overflow-hidden">    
          {/* Main Content Section */}
          <div className={`flex flex-col flex-grow transition-all`}>
            {/* Navbar */}
            <div
              className="fixed top-0 left-0 right-0 h-[64px] flex bg-white transition-all"
            >
              <CourseNavbar />
            </div>
    
            {/* Page Content Below Navbar */}
            <div className="flex flex-col mt-16 overflow-auto h-full no-scrollbar">
              <Outlet />
            </div>
          </div>
        </div>
      );
}
