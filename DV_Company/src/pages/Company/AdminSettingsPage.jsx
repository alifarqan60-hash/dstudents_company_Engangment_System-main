import React from "react";
import Navbar from "../../components/Navbar/Navbar";

export default function AdminSettingsPage() {
  return (
    <div
      className={`flex flex-row rounded-tl-3xl bg-white rounded-bl-3xl h-full `}
    >
      <div className=" flex-[5] w-full font-sans mb-10">
        {/* NavBar  */}
        <Navbar heading={"Settings"} name={"Alex Jhons"} role={"Admin"} />
      </div>
    </div>
  );
}
