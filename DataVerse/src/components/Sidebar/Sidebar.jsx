import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebar_links } from "../../constants/sidebarLinks";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/AuthSlice";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar({ collapsed, toggleSidebar }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  return (
    <div
      className={`text-slate-300 min-h-screen bg-slate-900 mt-[72px] border-r border-slate-800 transition-all ${collapsed ? "w-16" : "w-64"
        }`}
    >
      {/* Logo Div */}
      <div
        className={`flex-1 w-full flex justify-between ${!collapsed ? "px-4" : "px-2"
          } py-4 items-center`}
      >
        <div
          className={`cursor-pointer p-2 rounded-xl transition-colors hover:bg-slate-800 ${!collapsed ? "" : "mx-auto"}`}
          onClick={toggleSidebar}
        >
          <IoMenu size={24} className="text-slate-400" />
        </div>
      </div>

      {/* Sidebar Links Div */}
      <div className="flex-[4] w-full mt-4 border-t border-slate-800 pt-4">
        {sidebar_links.map((item) => (
          <SidebarLink key={item.key} item={item} collapsed={collapsed} />
        ))}
      </div>
      {collapsed ? (
        isAuthenticated ? (
          <div>
            <button
              onClick={() => dispatch(logout())}
              className="px-2 py-2 ml-4 flex bg-customBlue2 transform-all duration-200 text-white font-semibold rounded-md text-sm hover:scale-110"
            >
              {" "}
              <RiLogoutBoxLine color="white" size={20} />{" "}

            </button>
          </div>
        ) : (
          <></>
        )
      ) : isAuthenticated ? (
        <div>
          <button
            onClick={() => dispatch(logout())}
            className="px-3 py-2 ml-4 mt-5 flex bg-customBlue2 transform-all duration-200 text-white font-semibold rounded-md text-sm hover:scale-110"
          >
            {" "}
            <RiLogoutBoxLine color="white" size={20} className="mr-2" /> Logout
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function SidebarLink({ item, collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.includes(item.key);

  const handleClick = () => {
    console.log(item);
    navigate(item.path);
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-3 mx-3 py-3 px-4 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${isActive
        ? "bg-slate-700 text-white shadow-xl shadow-slate-900/40 ring-1 ring-slate-600"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
    >
      <span className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
        {item.icon}
      </span>
      {!collapsed && (
        <span className="text-[15px] font-semibold tracking-tight">{item.label}</span>
      )}
    </div>
  );
}
