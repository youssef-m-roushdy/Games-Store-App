import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="p-4 flex justify-between items-center  bg-gradient-to-r from-cyan-500 to-blue-500">
        
        <ul className="flex">
          <li className="mr-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-white" : "text-slate-200"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `${isActive ? "text-white" : "text-slate-200"}`
              }
            >
              Games
            </NavLink>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
