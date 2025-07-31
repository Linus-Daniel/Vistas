"use client"
import React, { useState } from 'react';
import { FaMicrochip, FaBolt, FaCode, FaUpload } from 'react-icons/fa6';
import {  FaSave, FaTimes,  } from 'react-icons/fa';
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

export default function AddComponent() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'microcontrollers',
    description: '',
    stock: 0,
    lowStockThreshold: 5,
    price: 0,
    voltage: '',
    current: '',
    package: '',
    datasheet: null,
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
      alert('Component added successfully!');
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaMicrochip className="mr-2 text-primary-500" /> Add New Component
        </h1>
        <Link href="/components" className="btn-outline flex items-center">
          <FaTimes className="mr-2" /> Cancel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Component Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-default"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU*</label>
              <input
                type="text"
                id="sku"
                name="sku"
                className="input-default"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
              <select
                id="category"
                name="category"
                className="select-default"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {componentCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Initial Stock*</label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="input-default"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold*</label>
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                className="input-default"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input-default"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="voltage" className="block text-sm font-medium text-gray-700 mb-1">Operating Voltage</label>
              <input
                type="text"
                id="voltage"
                name="voltage"
                className="input-default"
                value={formData.voltage}
                onChange={handleChange}
                placeholder="e.g., 5V, 3.3V"
              />
            </div>
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">Current Rating</label>
              <input
                type="text"
                id="current"
                name="current"
                className="input-default"
                value={formData.current}
                onChange={handleChange}
                placeholder="e.g., 20mA, 500mA"
              />
            </div>
            <div>
              <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
              <input
                type="text"
                id="package"
                name="package"
                className="input-default"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g., DIP, SMD, TO-92"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (USD)*</label>
              <input
                type="number"
                id="price"
                name="price"
                className="input-default"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datasheet</label>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  {formData.datasheet ? (
                    <span className="block text-sm text-primary-600">Datasheet uploaded</span>
                  ) : (
                    <>
                      <FaUpload className="mx-auto text-gray-400" />
                      <span className="block text-sm text-gray-600">Click to upload datasheet</span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'datasheet')}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Component Image</label>
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="h-32 w-auto mx-auto" />
                ) : (
                  <>
                    <FaUpload className="mx-auto text-gray-400" />
                    <span className="block text-sm text-gray-600">Click to upload image</span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                />
              </div>
            </label>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isSubmitting}
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Component'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}