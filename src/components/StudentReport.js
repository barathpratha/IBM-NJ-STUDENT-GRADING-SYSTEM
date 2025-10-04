import React, { useState, useEffect } from 'react';
import { BookOpen, Award, TrendingUp, Download, FileText, Calendar, User, BarChart3 } from 'lucide-react';
import apiService from '../services/api';

const StudentReport = ({ user }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    academicYear: '2023-2024',
    semester: ''
  });

  // Demo data for development
  const demoReport = {
    academicInfo: {
      academicYear: '2023-2024',
      semester: 'All',
      reportGeneratedAt: '2024-01-15T10:30:00.000Z'
    },
    grades: [
      {
        _id: '1',
        subject: {
          _id: '1',
          subjectName: 'Programming Fundamentals',
          subjectCode: 'CS101',
          credits: 4,
          maxMarks: 100,
          department: 'Computer Science'
        },
        marks: 85,
        grade: 'A',
        semester: '1st Semester',
        academicYear: '2023-2024',
        examType: 'Final'
      },
      {
        _id: '2',
        subject: {
          _id: '2',
          subjectName: 'Data Structures',
          subjectCode: 'CS201',
          credits: 3,
          maxMarks: 100,
          department: 'Computer Science'
        },
        marks: 78,
        grade: 'B+',
        semester: '1st Semester',
        academicYear: '2023-2024',
        examType: 'Final'
      },
      {
        _id: '3',
        subject: {
          _id: '3',
          subjectName: 'Database Systems',
          subjectCode: 'CS301',
          credits: 3,
          maxMarks: 100,
          department: 'Computer Science'
        },
        marks: 92,
        grade: 'A+',
        semester: '2nd Semester',
        academicYear: '2023-2024',
        examType: 'Final'
      },
      {
        _id: '4',
        subject: {
          _id: '4',
          subjectName: 'Software Engineering',
          subjectCode: 'CS401',
          credits: 4,
          maxMarks: 100,
          department: 'Computer Science'
        },
        marks: 88,
        grade: 'A',
        semester: '2nd Semester',
        academicYear: '2023-2024',
        examType: 'Final'
      }
    ],
    enrollments: [
      {
        _id: '1',
        subject: {
          _id: '1',
          subjectName: 'Programming Fundamentals',
          subjectCode: 'CS101',
          credits: 4,
          department: 'Computer Science'
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
          department: 'Computer Science'
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
          department: 'Computer Science'
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
          department: 'Computer Science'
        },
        academicYear: '2023-2024',
        semester: '2nd Semester',
        enrolledAt: '2023-01-15T00:00:00.000Z',
        isActive: true
      }
    ],
    performance: {
      totalCredits: 14,
      gpa: 3.7,
      averageMarks: 85.75,
      totalSubjects: 4,
      completedSubjects: 4
    },
    gradeDistribution: {
      'A+': 1,
      'A': 2,
      'B+': 1,
      'B': 0,
      'C+': 0,
      'C': 0,
      'D': 0,
      'F': 0
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filters]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, use demo data
      // In production, uncomment the following lines:
      // const response = await apiService.getStudentReport(filters);
      // setReport(response.data);
      
      // Demo data
      setReport(demoReport);
    } catch (err) {
      setError('Failed to fetch report. Using demo data.');
      setReport(demoReport);
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

  const handleDownloadReport = () => {
    // Simulate PDF download
    const reportData = {
      student: user.fullName,
      academicYear: report.academicInfo.academicYear,
      gpa: report.performance.gpa,
      totalCredits: report.performance.totalCredits,
      subjects: report.grades.map(grade => ({
        subject: grade.subject.subjectName,
        code: grade.subject.subjectCode,
        marks: grade.marks,
        grade: grade.grade,
        credits: grade.subject.credits
      }))
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-report-${user.fullName.replace(' ', '-')}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your academic report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No report available</h3>
          <p className="text-gray-600">Unable to generate academic report.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Academic Report</h1>
              <p className="text-gray-600 mt-2">Comprehensive academic performance overview</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Generated on {formatDate(report.academicInfo.reportGeneratedAt)}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDownloadReport}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Report Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select
                value={filters.academicYear}
                onChange={(e) => handleFilterChange('academicYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
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
                onClick={fetchReport}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-gray-900">{report.performance.gpa}</p>
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
                <p className="text-2xl font-bold text-gray-900">{report.performance.averageMarks}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">{report.performance.totalCredits}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{report.performance.totalSubjects}</p>
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

        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(report.gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="text-center">
                <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(grade)}`}>
                  {grade}
                </div>
                <p className="text-sm text-gray-600 mt-1">{count} subjects</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Overall GPA</p>
              <p className="text-3xl font-bold text-blue-600">{report.performance.gpa}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Overall Percentage</p>
              <p className="text-3xl font-bold text-green-600">{report.performance.averageMarks}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-3xl font-bold text-purple-600">{report.performance.totalCredits}</p>
            </div>
          </div>
        </div>

        {/* Subject Grades */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Subject Grades</h3>
            <p className="text-sm text-gray-600">{report.grades.length} subjects completed</p>
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
                    Credits
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.grades.map((grade) => (
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
                            {grade.subject.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.subject.subjectCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.subject.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.marks}/{grade.subject.maxMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.semester}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;

