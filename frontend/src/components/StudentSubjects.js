import React, { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Award, Filter, RefreshCw } from 'lucide-react';
import apiService from '../services/api';

const StudentSubjects = ({ user }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    academicYear: '',
    semester: ''
  });

  // Demo data for development
  const demoSubjects = [
    {
      _id: '1',
      subject: {
        _id: '1',
        subjectName: 'Programming Fundamentals',
        subjectCode: 'CS101',
        credits: 4,
        department: 'Computer Science',
        teacher: {
          profile: {
            firstName: 'Dr. Sarah',
            lastName: 'Johnson'
          }
        }
      },
      academicYear: '2023-2024',
      semester: '1st Semester',
      enrolledAt: '2023-08-15T00:00:00.000Z',
      isActive: true
    },
    {
      _id: '2',
      subject: {
        _id: '2',
        subjectName: 'Data Structures',
        subjectCode: 'CS201',
        credits: 3,
        department: 'Computer Science',
        teacher: {
          profile: {
            firstName: 'Prof. Michael',
            lastName: 'Chen'
          }
        }
      },
      academicYear: '2023-2024',
      semester: '1st Semester',
      enrolledAt: '2023-08-15T00:00:00.000Z',
      isActive: true
    },
    {
      _id: '3',
      subject: {
        _id: '3',
        subjectName: 'Database Systems',
        subjectCode: 'CS301',
        credits: 3,
        department: 'Computer Science',
        teacher: {
          profile: {
            firstName: 'Dr. Emily',
            lastName: 'Davis'
          }
        }
      },
      academicYear: '2023-2024',
      semester: '2nd Semester',
      enrolledAt: '2023-01-15T00:00:00.000Z',
      isActive: true
    },
    {
      _id: '4',
      subject: {
        _id: '4',
        subjectName: 'Software Engineering',
        subjectCode: 'CS401',
        credits: 4,
        department: 'Computer Science',
        teacher: {
          profile: {
            firstName: 'Prof. Robert',
            lastName: 'Wilson'
          }
        }
      },
      academicYear: '2023-2024',
      semester: '2nd Semester',
      enrolledAt: '2023-01-15T00:00:00.000Z',
      isActive: true
    }
  ];

  useEffect(() => {
    fetchSubjects();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, use demo data
      // In production, uncomment the following lines:
      // const response = await apiService.getStudentSubjects(filters);
      // setSubjects(response.data);
      
      // Demo data
      setSubjects(demoSubjects);
    } catch (err) {
      setError('Failed to fetch subjects. Using demo data.');
      setSubjects(demoSubjects);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getTotalCredits = () => {
    return subjects.reduce((total, enrollment) => total + enrollment.subject.credits, 0);
  };

  const getSubjectsBySemester = () => {
    const grouped = subjects.reduce((acc, enrollment) => {
      const semester = enrollment.semester;
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(enrollment);
      return acc;
    }, {});
    return grouped;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Subjects</h1>
              <p className="text-gray-600 mt-2">View your enrolled subjects and academic information</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select
                value={filters.academicYear}
                onChange={(e) => handleFilterChange('academicYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchSubjects}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalCredits()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.filter(s => s.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        {/* Subjects by Semester */}
        {Object.keys(getSubjectsBySemester()).length > 0 ? (
          Object.entries(getSubjectsBySemester()).map(([semester, semesterSubjects]) => (
            <div key={semester} className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{semester}</h3>
                <p className="text-sm text-gray-600">{semesterSubjects.length} subjects</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {semesterSubjects.map((enrollment) => (
                      <tr key={enrollment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {enrollment.subject.subjectName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {enrollment.subject.subjectCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="text-sm text-gray-900">
                              {enrollment.subject.teacher.profile.firstName} {enrollment.subject.teacher.profile.lastName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {enrollment.subject.credits}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {enrollment.subject.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(enrollment.enrolledAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            enrollment.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {enrollment.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600">You are not enrolled in any subjects for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubjects;

