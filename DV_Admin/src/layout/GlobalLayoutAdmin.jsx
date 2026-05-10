import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { IoMenu } from "react-icons/io5";
import { useOverLay } from "../contexts/OverlayContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../redux/auth/AuthSlice";

export default function GlobalLayoutAdmin() {
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {

    const fetchUser = async () => {
      await dispatch(fetchUserDetails())
    }

    if(!user)
      fetchUser()
  }, [])


  const toggleMenu = () => {
    setMenu(!menu);
  };

  const { isOverlayEnable } = useOverLay();

  return (
    <div>
      {/* Full Screen Div  */}
      <div className={` w-auto h-auto flex flex-row bg-custom-gradient2 `}>
        {/* Menu Icon Div */}
        <div
          className={`absolute md:hidden bg-custom-gradient top-4 ${
            menu ? "left-48" : "left-4"
          } rounded-lg`}
          onClick={toggleMenu}
        >
          <IoMenu size={45} color="white" />
        </div>

        {menu && (
          <div className="flex-1 md:hidden">
            <Sidebar />
          </div>
        )}

        <div className="flex-1 hidden md:flex">
          <Sidebar />
        </div>

        {isOverlayEnable && (
          <div className="bg-black fixed inset-0 opacity-50"></div>
        )}

        <div className={`flex-[5] min-h-screen`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
