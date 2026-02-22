import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-slate-700 h-screen w-screen flex items-center flex-col justify-center font-bold text-2xl gap-3">
      <marquee behavior="alternate" className="h-[200px] flex items-center">
        <img
          src="src\assets\page-not-found.png"
          alt=""
          className="h-[100px] animate-bounce"
        />
      </marquee>
      {/* <img src="src\assets\page-error.png" alt="" className='h-[18%] animate-[spin_3s_linear_infinite]'/> */}
      <p>Sorry, Page not found.</p>
      <p>
        Go back to
        <NavLink
          to="/"
          className="text-amber-300 p-2 rounded-lg hover:bg-slate-800"
        >
          Home
        </NavLink>
      </p>
    </div>
  );
};

export default PageNotFound;
