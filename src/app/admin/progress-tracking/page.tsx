"use client"
import React, { useState } from 'react';
import { FaCheckCircle, FaSearch } from 'react-icons/fa';
import { FaChartLine,  FaUserGraduate, FaBook, } from 'react-icons/fa6';

export default function ProgressTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  
  const students = [
    { id: 1, name: 'John Doe', program: 'Frontend Development', coursesCompleted: 5, totalCourses: 8, progress: 62 },
    { id: 2, name: 'Jane Smith', program: 'Backend Development', coursesCompleted: 7, totalCourses: 10, progress: 70 },
    { id: 3, name: 'Robert Johnson', program: 'UI/UX Design', coursesCompleted: 3, totalCourses: 6, progress: 50 },
    { id: 4, name: 'Emily Davis', program: 'Data Science', coursesCompleted: 9, totalCourses: 12, progress: 75 },
    { id: 5, name: 'Michael Wilson', program: 'Mobile Development', coursesCompleted: 4, totalCourses: 8, progress: 50 },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === 'all' || student.program === programFilter;
    return matchesSearch && matchesProgram;
  });

  const getProgressColor = (progress:number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChartLine className="mr-2 text-primary-500" /> Progress Tracking
        </h1>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="btn-outline">Generate Report</button>
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
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="all">All Programs</option>
              <option>Frontend Development</option>
              <option>Backend Development</option>
              <option>UI/UX Design</option>
              <option>Data Science</option>
              <option>Mobile Development</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FaUserGraduate className="inline mr-1" /> {student.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FaBook className="inline mr-1" /> {student.coursesCompleted}/{student.totalCourses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getProgressColor(student.progress)}`} 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{student.progress}% complete</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {student.progress === 100 ? (
                      <span className="text-green-600 flex items-center justify-end">
                        <FaCheckCircle className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="text-primary-600">In Progress</span>
                    )}
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