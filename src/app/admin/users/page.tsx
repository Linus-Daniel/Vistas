"use client"
import React, { useState } from 'react';
import { FaEdit, FaSearch, FaUserCog } from 'react-icons/fa';
import { FaUserShield,  FaPlus, FaTrash, FaUser, FaUserTie, FaPenToSquare,  } from 'react-icons/fa6';

export default function UsersAndRoles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', lastActive: '2023-05-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', lastActive: '2023-05-19' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'author', lastActive: '2023-05-18' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'contributor', lastActive: '2023-05-17' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'subscriber', lastActive: '2023-05-16' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role:"admin"|"editor"|"author"|"contributor") => {
    const icons = {
      admin: <FaUserShield className="text-purple-500" />,
      editor: <FaUserTie className="text-blue-500" />,
      author: <FaPenToSquare className="text-green-500" />,
      contributor: <FaUser className="text-yellow-500" />,
      subscriber: <FaUser className="text-gray-500" />,
    };
    return icons[role] || <FaUserCog className="text-gray-500" />;
  };

  const getRoleBadge = (role:string) => {
    const roleClasses = {
      admin: 'bg-purple-100 text-purple-800',
      editor: 'bg-blue-100 text-blue-800',
      author: 'bg-green-100 text-green-800',
      contributor: 'bg-yellow-100 text-yellow-800',
      subscriber: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[role as "author"|"contributor"|"subscriber"|"editor"|"admin"]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaUserShield className="mr-2 text-primary-500" /> Users & Roles
        </h1>
        <button className="btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative mb-4 md:mb-0 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select 
              className="select-default"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="contributor">Contributor</option>
              <option value="subscriber">Subscriber</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{getRoleIcon(user.role as any)}</span>
                      {getRoleBadge(user.role)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
          </div>
          <div className="flex space-x-2">
            <button className="btn-outline" disabled>Previous</button>
            <button className="btn-outline" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}