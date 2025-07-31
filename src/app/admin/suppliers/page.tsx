"use client"
import React, { useState } from 'react';
import { FaTruck,  FaPlus,  FaTrash, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa6';
import Link from 'next/link';
import { FaEdit, FaSearch } from 'react-icons/fa';

export default function SuppliersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const suppliers = [
    {
      id: 'SUP-001',
      name: 'ElectroParts Inc.',
      contact: 'John Smith',
      email: 'john@electroparts.com',
      phone: '+1 (555) 123-4567',
      website: 'https://electroparts.com',
      leadTime: '3-5 days',
      componentsSupplied: ['Microcontrollers', 'Sensors']
    },
    // Add more suppliers...
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaTruck className="mr-2 text-primary-500" /> Suppliers
        </h1>
        <Link href="/suppliers/add" className="btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" /> Add Supplier
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
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Components</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <FaGlobe className="mr-1 text-gray-400" />
                      <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        {supplier.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <FaEnvelope className="mr-1 text-gray-400" /> {supplier.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <FaPhone className="mr-1 text-gray-400" /> {supplier.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Lead Time: {supplier.leadTime}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {supplier.componentsSupplied.map((comp, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/suppliers/edit/${supplier.id}`} 
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSuppliers.length}</span> of{' '}
            <span className="font-medium">{suppliers.length}</span> results
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