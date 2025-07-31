"use client"
import React, { useState } from 'react';
import { FaChartPie,  FaDownload } from 'react-icons/fa6';

export default function ReportsAndAnalytics() {
  const [timeRange, setTimeRange] = useState('last_30_days');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'sales', name: 'Sales' },
    { id: 'users', name: 'Users' },
    { id: 'courses', name: 'Courses' },
    { id: 'traffic', name: 'Traffic' },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChartPie className="mr-2 text-primary-500" /> Reports & Analytics
        </h1>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <select 
            className="select-default"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="this_year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="btn-outline flex items-center">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                <p className="text-2xl font-bold">$24,780</p>
                <p className="text-sm text-green-500 mt-1">+12.5% from last period</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">New Users</h3>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-sm text-green-500 mt-1">+8.2% from last period</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Course Enrollments</h3>
                <p className="text-2xl font-bold">568</p>
                <p className="text-sm text-green-500 mt-1">+5.7% from last period</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Active Students</h3>
                <p className="text-2xl font-bold">892</p>
                <p className="text-sm text-red-500 mt-1">-2.3% from last period</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 h-80 flex items-center justify-center">
              <p className="text-gray-400">Revenue Chart</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 h-80 flex items-center justify-center">
              <p className="text-gray-400">User Growth Chart</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 h-96 flex items-center justify-center">
            <p className="text-gray-400">Detailed Analytics Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
}