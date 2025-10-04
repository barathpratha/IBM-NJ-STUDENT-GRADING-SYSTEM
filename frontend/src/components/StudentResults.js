import React, { useState, useEffect } from 'react';
import { Download, Award, TrendingUp, BarChart3, BookOpen, User } from 'lucide-react';

const StudentResults = ({ user }) => {
  const [studentResults, setStudentResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Demo data for the logged-in student
  useEffect(() => {
    const demoStudentResults = {
      id: 1,
      studentId: 'CS2021001',
      studentName: user.fullName,
      department: user.profile.department || 'Computer Science',
      year: user.profile.year || '3rd Year',
      subjects: [
        { name: 'Programming Fundamentals', code: 'CS101', marks: 85, grade: 'A', credits: 4, semester: '1st Semester' },
        { name: 'Data Structures', code: 'CS201', marks: 78, grade: 'B+', credits: 3, semester: '1st Semester' },
        { name: 'Database Systems', code: 'CS301', marks: 92, grade: 'A+', credits: 3, semester: '2nd Semester' },
        { name: 'Software Engineering', code: 'CS401', marks: 88, grade: 'A', credits: 4, semester: '2nd Semester' }
      ],
      totalCredits: 14,
      gpa: 3.7,
      percentage: 85.75,
      rank: 1,
      academicYear: '2023-2024'
    };
    setStudentResults(demoStudentResults);
  }, [user]);

  const handleDownloadReport = () => {
    // Simulate PDF download
    alert(`Downloading academic report for ${user.fullName}...`);
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

  if (!studentResults) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Academic Results</h2>
          <p className="text-gray-600">View your grades, performance, and academic progress</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Student Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{studentResults.studentName}</h3>
            <p className="text-gray-600">Student ID: {studentResults.studentId}</p>
            <p className="text-gray-600">{studentResults.department} - {studentResults.year}</p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">GPA</p>
              <p className="text-2xl font-bold text-gray-900">{studentResults.gpa}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-2xl font-bold text-gray-900">{studentResults.percentage}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900">{studentResults.totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Class Rank</p>
              <p className="text-2xl font-bold text-gray-900">#{studentResults.rank}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Results */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Subject-wise Performance</h3>
          <p className="text-sm text-gray-600">Academic Year: {studentResults.academicYear}</p>
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
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentResults.subjects.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.marks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Overall GPA</p>
            <p className="text-3xl font-bold text-blue-600">{studentResults.gpa}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Overall Percentage</p>
            <p className="text-3xl font-bold text-green-600">{studentResults.percentage}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Class Rank</p>
            <p className="text-3xl font-bold text-purple-600">#{studentResults.rank}</p>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(grade => {
            const count = studentResults.subjects.filter(subject => subject.grade === grade).length;
            return (
              <div key={grade} className="text-center">
                <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(grade)}`}>
                  {grade}
                </div>
                <p className="text-sm text-gray-600 mt-1">{count} subjects</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
