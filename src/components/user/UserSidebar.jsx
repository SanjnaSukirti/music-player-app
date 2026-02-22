import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserTimes } from "react-icons/fa";

const UserSidebar = () => {
  return (
    <div className="h-[100%] w-[20%] bg-slate-800 px-4 py-8 shrink-0">
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/user-profile"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span>
              <MdAccountBox className="text-2xl" />
            </span>
            <span>My Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-picture"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span>
              <AiFillPicture className="text-2xl" />
            </span>
            <span>Update Picture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-profile"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span>
              <FaAddressCard className="text-2xl"/>
            </span>
            <span>Update Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-password"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-blue-800 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span>
              <RiLockPasswordFill className="text-2xl"/>
            </span>
            <span>Update Password</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/delete-account"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 w-[100%] px-4 rounded-lg flex gap-2 items-center font-semibold hover:bg-red-700 ${
                isActive && "bg-red-500"
              }`;
            }}
          >
            <span>
            <FaUserTimes className="text-2xl"/>
            </span>
            <span>Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
