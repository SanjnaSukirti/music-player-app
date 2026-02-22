import React from "react";
import { NavLink } from "react-router-dom";
import { MdLibraryMusic } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const AdminSidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] w-[20%] bg-slate-800 px-4 py-8 shrink-0 sticky top-[70px] ">
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/admin"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span><RxDashboard className="text-2xl"/></span>
            <span>Admin Dashboard</span>
          </NavLink>
        </li>
        <li><NavLink
            to="/admin/add-album"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span><MdLibraryMusic className="text-2xl"/></span>
            <span>Add Albums</span>
          </NavLink></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
