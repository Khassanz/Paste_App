import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center bg-indigo-600 p-4 rounded-md shadow-lg">
    <div className="flex flex-row gap-6">
      <NavLink 
        to="/" 
        className="text-white text-lg font-semibold hover:text-indigo-300 transition duration-300 ease-in-out"
      >
        Home
      </NavLink>
  
      <NavLink 
        to="/pastes" 
        className="text-white text-lg font-semibold hover:text-indigo-300 transition duration-300 ease-in-out"
      >
        PasteList
      </NavLink>
    </div>
  </div>
  

  );
};

export default Navbar;
