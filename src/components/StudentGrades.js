import React, { useState, useEffect } from 'react';
import { BookOpen, Award, TrendingUp, Filter, RefreshCw, Download } from 'lucide-react';
import apiService from '../services/api';

const StudentGrades = ({ user }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    academicYear: '',
    semester: '',
    examType: ''
  });

  // Demo data for development
  const demoGrades = [
    {
      _id: '1',
      subject: {
        _id: '1',
        subjectName: 'Programming Fundamentals',
        subjectCode: 'CS101',
        credits: 4,
        department: 'Computer Science'
      },
      marks: 85,
      grade: 'A',
      semester: '1st Semester',
      academicYear: '2023-2024',
      examType: 'Midterm',
      remarks: 'Excellent performance',
      gradedBy: 'Dr. Sarah Johnson'
    },
    {
      _id: '2',
      subject: {
        _id: '1',
        subjectName: 'Programming Fundamentals',
        subjectCode: 'CS101',
        credits: 4,
        department: 'Computer Science'
      },
      marks: 92,
      grade: 'A+',
      semester: '1st Semester',
      academicYear: '2023-2024',
      examType: 'Final',
      remarks: 'Outstanding work',
      gradedBy: 'Dr. Sarah Johnson'
    },
    {
      _id: '3',
      subject: {
        _id: '2',
        subjectName: 'Data Structures',
        subjectCode: 'CS201',
        credits: 3,
        department: 'Computer Science'
      },
      marks: 78,
      grade: 'B+',
      semester: '1st Semester',
      academicYear: '2023-2024',
      examType: 'Midterm',
      remarks: 'Good understanding',
      gradedBy: 'Prof. Michael Chen'
    },
    {
      _id: '4',
      subject: {
        _id: '2',
        subjectName: 'Data Structures',
        subjectCode: 'CS201',
        credits: 3,
        department: 'Computer Science'
      },
      marks: 88,
      grade: 'A',
      semester: '1st Semester',
      academicYear: '2023-2024',
      examType: 'Final',
      remarks: 'Well done',
      gradedBy: 'Prof. Michael Chen'
    },
    {
      _id: '5',
      subject: {
        _id: '3',
        subjectName: 'Database Systems',
        subjectCode: 'CS301',
        credits: 3,
        department: 'Computer Science'
      },
      marks: 95,
      grade: 'A+',
      semester: '2nd Semester',
      academicYear: '2023-2024',
      examType: 'Midterm',
      remarks: 'Exceptional work',
      gradedBy: 'Dr. Emily Davis'
    },
    {
      _id: '6',
      subject: {
        _id: '4',
        subjectName: 'Software Engineering',
        subjectCode: 'CS401',
        credits: 4,
        department: 'Computer Science'
      },
      marks: 90,
      grade: 'A+',
      semester: '2nd Semester',
      academicYear: '2023-2024',
      examType: 'Project',
      remarks: 'Excellent project delivery',
      gradedBy: 'Prof. Robert Wilson'
    }
  ];

  useEffect(() => {
    fetchGrades();
  }, [filters]);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, use demo data
      // In production, uncomment the following lines:
      // const response = await apiService.getStudentGrades(filters);
      // setGrades(response.data);
      
      // Demo data
      setGrades(demoGrades);
    } catch (err) {
      setError('Failed to fetch grades. Using demo data.');
      setGrades(demoGrades);
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

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamTypeColor = (examType) => {
    switch (examType) {
      case 'Final':
        return 'bg-red-100 text-red-800';
      case 'Midterm':
        return 'bg-blue-100 text-blue-800';
      case 'Quiz':
        return 'bg-green-100 text-green-800';
      case 'Assignment':
        return 'bg-purple-100 text-purple-800';
      case 'Project':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAverageMarks = () => {
    if (grades.length === 0) return 0;
    const totalMarks = grades.reduce((sum, grade) => sum + grade.marks, 0);
    return (totalMarks / grades.length).toFixed(1);
  };

  const getGradeDistribution = () => {
    const distribution = {};
    grades.forEach(grade => {
      distribution[grade.grade] = (distribution[grade.grade] || 0) + 1;
    });
    return distribution;
  };

  const handleDownloadGrades = () => {
    // Simulate CSV download
    const csvContent = [
      ['Subject', 'Code', 'Marks', 'Grade', 'Exam Type', 'Semester', 'Academic Year'],
      ...grades.map(grade => [
        grade.subject.subjectName,
        grade.subject.subjectCode,
        grade.marks,
        grade.grade,
        grade.examType,
        grade.semester,
        grade.academicYear
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades-${user.fullName.replace(' ', '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your grades...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
              <p className="text-gray-600 mt-2">View your detailed grade information and performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDownloadGrades}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </button>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select
                value={filters.examType}
                onChange={(e) => handleFilterChange('examType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Final">Final</option>
                <option value="Midterm">Midterm</option>
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchGrades}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Grades</p>
                <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Marks</p>
                <p className="text-2xl font-bold text-gray-900">{calculateAverageMarks()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">A+ Grades</p>
                <p className="text-2xl font-bold text-gray-900">{getGradeDistribution()['A+'] || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(grades.map(g => g.subject._id)).size}</p>
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

        {/* Grades Table */}
        {grades.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Grade Details</h3>
              <p className="text-sm text-gray-600">{grades.length} grade entries found</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Graded By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grades.map((grade) => (
                    <tr key={grade._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {grade.subject.subjectName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {grade.subject.subjectCode} • {grade.subject.credits} credits
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExamTypeColor(grade.examType)}`}>
                          {grade.examType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.marks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.remarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.gradedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
            <p className="text-gray-600">You don't have any grades for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;

