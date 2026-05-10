import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../redux/auth/AuthSlice";

export default function GlobalLayout() {
  const { token, status, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && status === 'idle' && !user) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="h-screen w-screen flex flex-row bg-slate-50 overflow-hidden">
      {/* Sidebar Section */}
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content Section */}
      <div className={`flex flex-col flex-grow transition-all`}>
        {/* Navbar */}
        <div
          className="fixed top-0 left-0 right-0 h-[72px] flex bg-white transition-all z-[60]"
        >
          <Navbar />
        </div>

        {/* Page Content Below Navbar */}
        <div className="flex flex-col items-center mt-[72px] p-4 overflow-auto h-full no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
