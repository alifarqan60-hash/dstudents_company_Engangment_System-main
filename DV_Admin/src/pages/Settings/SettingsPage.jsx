import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/AuthSlice";
import Navbar from "../../components/Navbar/Navbar";
import {
  MdPerson,
  MdSecurity,
  MdDescription,
  MdLogout,
  MdChevronRight,
  MdAdminPanelSettings,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { toast } from "react-toastify";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const avatar = user?.imgUrl || user?.photo || IMAGES.student_avatar;

  const menuItems = [
    {
      icon: <MdPerson size={20} className="text-blue-500" />,
      label: "Edit Profile",
      subtitle: "Update your name, photo, and contact",
      bg: "bg-blue-50",
      onClick: () => navigate("/admin/settings/edit-profile"),
    },
    {
      icon: <MdSecurity size={20} className="text-purple-500" />,
      label: "Privacy & Policy",
      subtitle: "Review our privacy and data policies",
      bg: "bg-purple-50",
      onClick: () => { },
    },
    {
      icon: <MdDescription size={20} className="text-amber-500" />,
      label: "Terms & Conditions",
      subtitle: "Read our terms of service",
      bg: "bg-amber-50",
      onClick: () => { },
    },
  ];

  return (
    <>
      <div className="flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full">
        <div className="flex-[5] w-full overflow-y-auto">
          <Navbar heading="Settings" />

          <div className="max-w-2xl mx-auto px-6 py-10">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              {/* Gradient banner */}
              <div className="h-28 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
              </div>

              <div className="px-8 pb-6">
                <div className="flex items-end gap-5 -mt-14 mb-5">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt={user?.username}
                      onError={(e) => {
                        e.target.src = IMAGES.student_avatar;
                      }}
                      className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {user?.username || "Admin"}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-800 text-white px-2.5 py-1 rounded-full font-medium">
                        <MdAdminPanelSettings size={12} />
                        {user?.isAdmin ? "Super Admin" : "Admin"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <MdEmail className="text-slate-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <p className="text-sm font-semibold text-gray-700 truncate max-w-[150px]">
                        {user?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <MdPhone className="text-slate-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Phone</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {user?.phoneNo || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4">
              <div className="px-6 py-4 border-b border-gray-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Account Settings
                </p>
              </div>
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <MdChevronRight size={20} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 bg-white rounded-3xl border border-red-100 shadow-sm hover:bg-red-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <MdLogout size={20} className="text-red-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-red-500">Log Out</p>
                <p className="text-xs text-red-300 mt-0.5">
                  Sign out of your admin account
                </p>
              </div>
              <MdChevronRight size={20} className="text-red-200 group-hover:text-red-300 flex-shrink-0 transition-colors" />
            </button>

            <p className="text-center text-xs text-gray-300 mt-8">
              DataVerse Admin Panel • v1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsScreen;
