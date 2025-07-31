"use client"
import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { FaUserGroup, FaBook, FaEnvelope } from 'react-icons/fa6';

export default function EnrolledStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  
  const enrollments = [
    { id: 1, student: 'John Doe', course: 'Introduction to React', enrollmentDate: '2023-01-15', status: 'active', email: 'john@example.com' },
    { id: 2, student: 'Jane Smith', course: 'Node.js Fundamentals', enrollmentDate: '2023-02-10', status: 'active', email: 'jane@example.com' },
    { id: 3, student: 'Robert Johnson', course: 'UI/UX Design Principles', enrollmentDate: '2023-03-05', status: 'completed', email: 'robert@example.com' },
    { id: 4, student: 'Emily Davis', course: 'Python for Data Science', enrollmentDate: '2023-01-20', status: 'active', email: 'emily@example.com' },
    { id: 5, student: 'Michael Wilson', course: 'Mobile App Development', enrollmentDate: '2023-02-15', status: 'dropped', email: 'michael@example.com' },
  ];

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || enrollment.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const getStatusBadge = (status:string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      dropped: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaUserGroup className="mr-2 text-primary-500" /> Enrolled Students
        </h1>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="btn-outline">Export</button>
        </div>
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select 
              className="select-default"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              <option>Introduction to React</option>
              <option>Node.js Fundamentals</option>
              <option>UI/UX Design Principles</option>
              <option>Python for Data Science</option>
              <option>Mobile App Development</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                        {enrollment.student.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{enrollment.student}</div>
                        <div className="text-sm text-gray-500">
                          <FaEnvelope className="inline mr-1" /> {enrollment.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FaBook className="inline mr-1" /> {enrollment.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-1" /> {enrollment.enrollmentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(enrollment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                    <button className="text-primary-600 hover:text-primary-900">Edit</button>
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