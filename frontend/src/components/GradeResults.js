import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, Award, TrendingUp, BarChart3, User, BookOpen } from 'lucide-react';

const GradeResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showIndividualResults, setShowIndividualResults] = useState(false);

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Demo data
  useEffect(() => {
    const demoResults = [
      {
        id: 1,
        studentId: 'CS2021001',
        studentName: 'John Doe',
        department: 'Computer Science',
        year: '3rd Year',
        subjects: [
          { name: 'Programming Fundamentals', code: 'CS101', marks: 85, grade: 'A', credits: 4 },
          { name: 'Data Structures', code: 'CS201', marks: 78, grade: 'B+', credits: 3 },
          { name: 'Database Systems', code: 'CS301', marks: 92, grade: 'A+', credits: 3 },
          { name: 'Software Engineering', code: 'CS401', marks: 88, grade: 'A', credits: 4 }
        ],
        totalCredits: 14,
        gpa: 3.7,
        percentage: 85.75,
        rank: 1
      },
      {
        id: 2,
        studentId: 'CS2021002',
        studentName: 'Jane Smith',
        department: 'Computer Science',
        year: '3rd Year',
        subjects: [
          { name: 'Programming Fundamentals', code: 'CS101', marks: 82, grade: 'A', credits: 4 },
          { name: 'Data Structures', code: 'CS201', marks: 85, grade: 'A', credits: 3 },
          { name: 'Database Systems', code: 'CS301', marks: 79, grade: 'B+', credits: 3 },
          { name: 'Software Engineering', code: 'CS401', marks: 91, grade: 'A+', credits: 4 }
        ],
        totalCredits: 14,
        gpa: 3.6,
        percentage: 84.25,
        rank: 2
      },
      {
        id: 3,
        studentId: 'EE2021003',
        studentName: 'Mike Johnson',
        department: 'Electronics',
        year: '2nd Year',
        subjects: [
          { name: 'Basic Electronics', code: 'EE101', marks: 76, grade: 'B+', credits: 4 },
          { name: 'Digital Circuits', code: 'EE201', marks: 83, grade: 'A', credits: 3 },
          { name: 'Microprocessors', code: 'EE301', marks: 88, grade: 'A', credits: 3 }
        ],
        totalCredits: 10,
        gpa: 3.5,
        percentage: 82.33,
        rank: 3
      }
    ];
    setResults(demoResults);
  }, []);

  const calculateGPA = (subjects) => {
    const totalPoints = subjects.reduce((sum, subject) => {
      const points = subject.grade === 'A+' ? 4.0 :
                    subject.grade === 'A' ? 4.0 :
                    subject.grade === 'B+' ? 3.5 :
                    subject.grade === 'B' ? 3.0 :
                    subject.grade === 'C+' ? 2.5 :
                    subject.grade === 'C' ? 2.0 :
                    subject.grade === 'D' ? 1.0 : 0.0;
      return sum + (points * subject.credits);
    }, 0);
    
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const calculatePercentage = (subjects) => {
    const totalMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const totalSubjects = subjects.length;
    return totalSubjects > 0 ? (totalMarks / totalSubjects).toFixed(2) : 0;
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = 
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || result.department === filterDepartment;
    const matchesYear = !filterYear || result.year === filterYear;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const handleViewIndividual = (student) => {
    setSelectedStudent(student);
    setShowIndividualResults(true);
  };

  const handleDownloadReport = (student) => {
    // Simulate PDF download
    alert(`Downloading report for ${student.studentName}...`);
  };

  const getClassStatistics = () => {
    if (filteredResults.length === 0) return null;

    const totalStudents = filteredResults.length;
    const averageGPA = (filteredResults.reduce((sum, student) => sum + student.gpa, 0) / totalStudents).toFixed(2);
    const averagePercentage = (filteredResults.reduce((sum, student) => sum + student.percentage, 0) / totalStudents).toFixed(2);
    const passedStudents = filteredResults.filter(student => student.gpa >= 2.0).length;
    const passRate = ((passedStudents / totalStudents) * 100).toFixed(1);

    return {
      totalStudents,
      averageGPA: parseFloat(averageGPA),
      averagePercentage: parseFloat(averagePercentage),
      passedStudents,
      failedStudents: totalStudents - passedStudents,
      passRate: parseFloat(passRate)
    };
  };

  const classStats = getClassStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Grade Results</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <div className="text-sm text-gray-600 flex items-center">
            Total: {filteredResults.length} students
          </div>
        </div>
      </div>

      {/* Class Statistics */}
      {classStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{classStats.totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Average GPA</p>
                <p className="text-2xl font-bold text-gray-900">{classStats.averageGPA}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Average %</p>
                <p className="text-2xl font-bold text-gray-900">{classStats.averagePercentage}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-gray-900">{classStats.passRate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {result.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {result.studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.department}</div>
                    <div className="text-sm text-gray-500">{result.year}</div>
                    <div className="text-sm text-gray-500">{result.totalCredits} Credits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">GPA: {result.gpa}</div>
                        <div className="text-sm text-gray-500">{result.percentage}%</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Rank: #{result.rank}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewIndividual(result)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDownloadReport(result)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Student Results Modal */}
      {showIndividualResults && selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Academic Report - {selectedStudent.studentName}
                </h3>
                <button
                  onClick={() => setShowIndividualResults(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Student Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{selectedStudent.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-medium">{selectedStudent.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Credits</p>
                    <p className="font-medium">{selectedStudent.totalCredits}</p>
                  </div>
                </div>
              </div>

              {/* Subject-wise Results */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Subject-wise Performance</h4>
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
                      {selectedStudent.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {subject.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subject.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subject.marks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subject.grade === 'A+' || subject.grade === 'A' ? 'bg-green-100 text-green-800' :
                              subject.grade === 'B+' || subject.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                              subject.grade === 'C+' || subject.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              subject.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
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

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">GPA</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.gpa}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-2xl font-bold text-green-600">{selectedStudent.percentage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Class Rank</p>
                    <p className="text-2xl font-bold text-purple-600">#{selectedStudent.rank}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => handleDownloadReport(selectedStudent)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={() => setShowIndividualResults(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeResults;
