"use client"
import React, { useState } from 'react';
import { FaBoxOpen,  FaPlus,  FaTrash, FaListUl } from 'react-icons/fa6';
import Link from 'next/link';
import { FaEdit, FaSearch } from 'react-icons/fa';

export default function KitsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const kits = [
    {
      id: 'KIT-001',
      name: 'Arduino Starter Kit',
      description: 'Complete kit for Arduino beginners',
      price: 89.99,
      components: [
        { id: 'COMP-001', name: 'Arduino Uno R3', quantity: 1 },
        { id: 'COMP-010', name: 'Breadboard', quantity: 1 },
        { id: 'COMP-015', name: 'Jumper Wires', quantity: 40 },
        { id: 'COMP-020', name: 'LED Pack', quantity: 10 }
      ],
      stock: 25,
      status: 'active'
    },
    // Add more kits...
  ];

  const filteredKits = kits.filter(kit =>
    kit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status:string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      discontinued: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status as "active"|"inactive"|"discontinued"]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBoxOpen className="mr-2 text-primary-500" /> Kits & Bundles
        </h1>
        <Link href="/kits/create" className="btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" /> Create Kit
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search kits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kit Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Components</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredKits.map((kit) => (
                <tr key={kit.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{kit.name}</div>
                    <div className="text-sm text-gray-500">ID: {kit.id}</div>
                    {getStatusBadge(kit.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{kit.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{kit.components.length} components</div>
                    <button className="mt-1 text-xs text-primary-600 hover:underline flex items-center">
                      <FaListUl className="mr-1" /> View Components
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${kit.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{kit.stock} in stock</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/kits/edit/${kit.id}`} 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </Link>
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredKits.length}</span> of{' '}
            <span className="font-medium">{kits.length}</span> results
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