import React from "react";
import { FaBars, FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const Header = ({ onToggleSidebar }:{onToggleSidebar:()=>void}) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md lg:hidden text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <FaBars className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="ml-4 lg:ml-0 relative w-full max-w-md">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="ml-4 flex items-center md:ml-6">
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            <div className="ml-3 relative">
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Image
                  className="h-8 w-8 rounded-full"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                />
                <span className="ml-2 hidden md:block font-medium">
                  Admin User
                </span>
                <FaChevronDown className="ml-1 text-gray-400 w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
