"use client"
import React, { FormEvent, useState } from 'react';
import { FaGear} from 'react-icons/fa6';
import Link from 'next/link';
import { FaSave, FaTimes } from 'react-icons/fa';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Nascomsoft',
    siteDescription: 'IT Solutions and Education Platform',
    siteLogo: null,
    maintenanceMode: false,
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    emailNotifications: true,
    emailSender: 'no-reply@nascomsoft.com',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:FormEvent) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings(prev => ({
        ...prev,
        siteLogo: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(settings);
      setIsSubmitting(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaGear className="mr-2 text-primary-500" /> Settings
        </h1>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link href="/dashboard" className="btn-outline flex items-center">
            <FaTimes className="mr-2" /> Cancel
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button className="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm border-primary-500 text-primary-600">
              General
            </button>
            <button className="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Email
            </button>
            <button className="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Security
            </button>
            <button className="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Integrations
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    className="input-default"
                    value={settings.siteName}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                  <input
                    type="text"
                    id="siteDescription"
                    name="siteDescription"
                    className="input-default"
                    value={settings.siteDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Logo</label>
                <div className="mt-1 flex items-center">
                  {settings.siteLogo ? (
                    <div className="relative">
                      <img src={settings.siteLogo} alt="Site Logo" className="h-16 w-auto" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                        onClick={() => setSettings(prev => ({ ...prev, siteLogo: null }))}
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                        <span className="block text-sm text-gray-600">Click to upload logo</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    id="timezone"
                    name="timezone"
                    className="select-default"
                    value={settings.timezone}
                    onChange={handleChange}
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CET">Central European Time (CET)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    className="select-default"
                    value={settings.dateFormat}
                    onChange={handleChange}
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                  <select
                    id="timeFormat"
                    name="timeFormat"
                    className="select-default"
                    value={settings.timeFormat}
                    onChange={handleChange}
                  >
                    <option value="24h">24-hour</option>
                    <option value="12h">12-hour</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="maintenanceMode"
                    name="maintenanceMode"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="maintenanceMode" className="font-medium text-gray-700">Maintenance Mode</label>
                  <p className="text-gray-500">When enabled, the site will be unavailable to non-admin users.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Email Settings</h2>
              
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="emailNotifications" className="font-medium text-gray-700">Enable Email Notifications</label>
                  <p className="text-gray-500">Send email notifications for important system events.</p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="emailSender" className="block text-sm font-medium text-gray-700 mb-1">Sender Email Address</label>
                <input
                  type="email"
                  id="emailSender"
                  name="emailSender"
                  className="input-default"
                  value={settings.emailSender}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isSubmitting}
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}