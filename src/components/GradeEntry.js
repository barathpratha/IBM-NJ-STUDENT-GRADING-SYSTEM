import React, { useState, useEffect } from 'react';
import { Save, Edit, Trash2, BookOpen, User, Award, Calculator } from 'lucide-react';

const GradeEntry = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('Midterm');
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const examTypes = ['Midterm', 'Final', 'Quiz', 'Assignment', 'Project'];

  // Demo data
  useEffect(() => {
    const demoSubjects = [
      { id: 1, subjectCode: 'CS101', subjectName: 'Programming Fundamentals', department: 'Computer Science', year: '1st Year' },
      { id: 2, subjectCode: 'CS201', subjectName: 'Data Structures', department: 'Computer Science', year: '2nd Year' },
      { id: 3, subjectCode: 'EE101', subjectName: 'Basic Electronics', department: 'Electronics', year: '1st Year' }
    ];
    setSubjects(demoSubjects);

    const demoStudents = [
      { id: 1, firstName: 'John', lastName: 'Doe', studentId: 'CS2021001', department: 'Computer Science', year: '1st Year' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', studentId: 'CS2021002', department: 'Computer Science', year: '1st Year' },
      { id: 3, firstName: 'Mike', lastName: 'Johnson', studentId: 'EE2021003', department: 'Electronics', year: '1st Year' }
    ];
    setStudents(demoStudents);
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      // Initialize grades for selected subject
      const subjectStudents = students.filter(student => 
        student.department === subjects.find(s => s.id === parseInt(selectedSubject))?.department
      );
      
      const initialGrades = subjectStudents.map(student => ({
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        studentIdNumber: student.studentId,
        marks: '',
        grade: '',
        remarks: ''
      }));
      
      setGrades(initialGrades);
    }
  }, [selectedSubject, students, subjects]);

  const calculateGrade = (marks) => {
    if (marks === '' || marks < 0) return '';
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 40) return 'C';
    if (marks >= 33) return 'D';
    return 'F';
  };

  const handleMarksChange = (index, marks) => {
    const newGrades = [...grades];
    newGrades[index].marks = marks;
    newGrades[index].grade = calculateGrade(marks);
    setGrades(newGrades);
  };

  const handleRemarksChange = (index, remarks) => {
    const newGrades = [...grades];
    newGrades[index].remarks = remarks;
    setGrades(newGrades);
  };

  const handleSaveGrades = () => {
    const validGrades = grades.filter(grade => grade.marks !== '');
    
    if (validGrades.length === 0) {
      alert('Please enter at least one grade');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Successfully saved ${validGrades.length} grades for ${subjects.find(s => s.id === parseInt(selectedSubject))?.subjectName}`);
      setLoading(false);
    }, 1000);
  };

  const getSelectedSubject = () => {
    return subjects.find(s => s.id === parseInt(selectedSubject));
  };

  const getGradeStatistics = () => {
    const validGrades = grades.filter(grade => grade.marks !== '');
    if (validGrades.length === 0) return null;

    const totalMarks = validGrades.reduce((sum, grade) => sum + parseFloat(grade.marks), 0);
    const averageMarks = (totalMarks / validGrades.length).toFixed(2);
    const passedStudents = validGrades.filter(grade => grade.grade !== 'F').length;
    const passRate = ((passedStudents / validGrades.length) * 100).toFixed(1);

    return {
      totalStudents: validGrades.length,
      averageMarks: parseFloat(averageMarks),
      passedStudents,
      failedStudents: validGrades.length - passedStudents,
      passRate: parseFloat(passRate)
    };
  };

  const stats = getGradeStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Grade Entry</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.subjectCode} - {subject.subjectName}
              </option>
            ))}
          </select>
          
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {examTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubject && (
        <>
          {/* Subject Info */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getSelectedSubject()?.subjectName}
                </h3>
                <p className="text-sm text-gray-600">
                  {getSelectedSubject()?.subjectCode} - {getSelectedSubject()?.department} - {getSelectedSubject()?.year}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Calculator className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Average Marks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageMarks}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Passed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.passedStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-red-600" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.passRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grade Entry Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Enter Grades - {selectedExamType}
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grades.map((grade, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {grade.studentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {grade.studentIdNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={grade.marks}
                          onChange={(e) => handleMarksChange(index, e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0-100"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grade.grade === 'A+' || grade.grade === 'A' ? 'bg-green-100 text-green-800' :
                          grade.grade === 'B+' || grade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                          grade.grade === 'C+' || grade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          grade.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                          grade.grade === 'F' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {grade.grade || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={grade.remarks}
                          onChange={(e) => handleRemarksChange(index, e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Students: {grades.length} | Entered Grades: {grades.filter(g => g.marks !== '').length}
                </div>
                <button
                  onClick={handleSaveGrades}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Grades</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedSubject && (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Subject</h3>
          <p className="text-gray-600">Choose a subject from the dropdown above to start entering grades.</p>
        </div>
      )}
    </div>
  );
};

export default GradeEntry;
