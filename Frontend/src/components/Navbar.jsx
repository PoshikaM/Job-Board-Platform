import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">Job Portal</h1>
      <div className="space-x-6">
        <Link to="/jobs" className="text-gray-700 hover:text-indigo-600">
          Jobs
        </Link>
        <Link to="/my-applications" className="text-gray-700 hover:text-indigo-600">
          My Applications
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-indigo-600">
          Login
        </Link>
        <Link to="/signup" className="text-gray-700 hover:text-indigo-600">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;