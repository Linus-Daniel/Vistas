"use client"
import React, { useState } from 'react';
import { FaMicrochip,FaBolt, FaCode,  FaTrash,  } from 'react-icons/fa6';
import {   FaEdit, FaExclamationTriangle, FaPlus, FaSearch} from 'react-icons/fa';
import Link from 'next/link';

const componentCategories = [
  { value: 'microcontrollers', label: 'Microcontrollers', icon: <FaMicrochip /> },
  { value: 'boards', label: 'Development Boards', icon: <FaMicrochip /> },
  { value: 'sensors', label: 'Sensors', icon: <FaBolt /> },
  { value: 'modules', label: 'Modules', icon: <FaCode /> },
  { value: 'wires', label: 'Jumper Wires', icon: <FaBolt /> },
  { value: 'passives', label: 'Passive Components', icon: <FaBolt /> },
  { value: 'actives', label: 'Active Components', icon: <FaBolt /> },
  { value: 'tools', label: 'Tools & Accessories', icon: <FaBolt /> },
];

export default function ComponentsInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  
  const components = [
    {
      id: 'COMP-001',
      name: 'Arduino Uno R3',
      sku: 'ARD-Uno-R3',
      category: 'microcontrollers',
      description: 'ATmega328P microcontroller board',
      stock: 45,
      lowStockThreshold: 10,
      price: 22.90,
      voltage: '5V',
      current: '20mA',
      package: 'DIP',
      datasheet: '/datasheets/arduino-uno.pdf',
      status: 'in_stock' as "in_stock" | "low_stock" | "out_of_stock"
    },
    {
      id: 'COMP-002',
      name: 'ESP32 Dev Board',
      sku: 'ESP-32-Dev',
      category: 'boards',
      description: 'WiFi/Bluetooth development board',
      stock: 3,
      lowStockThreshold: 5,
      price: 12.50,
      voltage: '3.3V',
      current: '500mA',
      package: 'SMD',
      datasheet: '/datasheets/esp32.pdf',
      status: 'low_stock' as "low_stock" | "in_stock" | "out_of_stock"
    },
    // Add more components...
  ];

  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         comp.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || comp.category === categoryFilter;
    const matchesStock = stockFilter === 'all' || comp.status === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStatusBadge = (status: "in_stock"|"low_stock"|"out_of_stock") => {
    const statusClasses = {
      in_stock: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const getCategoryIcon = (category:string) => {
    const cat = componentCategories.find(c => c.value === category);
    return cat ? cat.icon : <FaMicrochip />;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaMicrochip className="mr-2 text-primary-500" /> Electronic Components
        </h1>
        <Link href="/admin/components/add" className="btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" /> Add Component
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select 
              className="select-default"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {componentCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <select 
              className="select-default"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specs</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComponents.map((comp) => (
                <tr key={comp.id} className={comp.status === 'low_stock' ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-50 rounded-md flex items-center justify-center text-primary-500">
                        {getCategoryIcon(comp.category)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{comp.name}</div>
                        <div className="text-sm text-gray-500">{comp.sku}</div>
                        {comp.status === 'low_stock' && (
                          <div className="flex items-center text-xs text-yellow-600 mt-1">
                            <FaExclamationTriangle className="mr-1" /> Low stock alert
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {componentCategories.find(c => c.value === comp.category)?.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{comp.voltage}, {comp.current}</div>
                    <div className="text-sm text-gray-500">{comp.package}</div>
                    {comp.datasheet && (
                      <a href={comp.datasheet} className="text-xs text-primary-600 hover:underline" target="_blank">
                        Datasheet
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{comp.stock} in stock</div>
                    {getStatusBadge(comp.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${comp.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/components/edit/${comp.id}`} 
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredComponents.length}</span> of{' '}
            <span className="font-medium">{components.length}</span> results
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