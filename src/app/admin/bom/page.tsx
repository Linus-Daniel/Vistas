"use client"
import React, { useState } from 'react';
import { FaListOl, FaPlus, FaDownload, FaTrash } from 'react-icons/fa6';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function BOMManager() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const boms = [
    {
      id: 'BOM-001',
      name: 'Smart Home Controller',
      description: 'Main controller board for smart home system',
      components: [
        { id: 'COMP-001', name: 'ESP32 Dev Board', quantity: 1 },
        { id: 'COMP-005', name: 'Relay Module', quantity: 4 },
        { id: 'COMP-008', name: 'Temperature Sensor', quantity: 2 }
      ],
      createdAt: '2023-05-15'
    },
    // Add more BOMs...
  ];

  const filteredBoms = boms.filter(bom =>
    bom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bom.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaListOl className="mr-2 text-primary-500" /> BOM Manager
        </h1>
        <Link href="/bom/create" className="btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" /> Create BOM
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
              placeholder="Search BOMs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOM Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Components</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBoms.map((bom) => (
                <tr key={bom.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{bom.name}</div>
                    <div className="text-sm text-gray-500">ID: {bom.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{bom.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{bom.components.length} components</div>
                    <ul className="mt-1 text-xs text-gray-500">
                      {bom.components.slice(0, 2).map((comp, idx) => (
                        <li key={idx}>
                          {comp.quantity}x {comp.name}
                        </li>
                      ))}
                      {bom.components.length > 2 && (
                        <li>+{bom.components.length - 2} more...</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bom.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <FaDownload className="inline mr-1" /> Export
                    </button>
                    <Link 
                      href={`/bom/edit/${bom.id}`} 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      Edit
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBoms.length}</span> of{' '}
            <span className="font-medium">{boms.length}</span> results
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