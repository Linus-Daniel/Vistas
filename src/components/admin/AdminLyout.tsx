"use client";
import React, { ReactNode, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = ({ children }:{children:ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0`}>
      <SideBar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
