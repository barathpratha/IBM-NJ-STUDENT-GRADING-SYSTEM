const Grade = require('../models/Grade');
const Subject = require('../models/Subject');
const Enrollment = require('../models/Enrollment');
const { calculatePerformanceMetrics, calculateGPA } = require('../../shared/utils/gradeCalculator');

// Get student's grades
const getStudentGrades = async (req, res) => {
  try {
    const { academicYear, semester } = req.query;
    const studentId = req.user.userId;
    
    let query = { student: studentId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const grades = await Grade.find(query)
      .populate('subject', 'subjectName subjectCode credits maxMarks department')
      .sort({ 'subject.subjectName': 1 });
    
    // Calculate performance metrics
    const performanceMetrics = calculatePerformanceMetrics(grades);
    
    res.json({
      success: true,
      data: {
        grades,
        performance: performanceMetrics
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student grades',
      error: error.message
    });
  }
};

// Get student's enrolled subjects
const getEnrolledSubjects = async (req, res) => {
  try {
    const { academicYear, semester } = req.query;
    const studentId = req.user.userId;
    
    let query = { student: studentId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const enrollments = await Enrollment.find(query)
      .populate('subject', 'subjectName subjectCode credits department teacher')
      .populate('subject.teacher', 'profile.firstName profile.lastName')
      .sort({ 'subject.subjectName': 1 });
    
    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled subjects',
      error: error.message
    });
  }
};

// Get student's academic report
const getAcademicReport = async (req, res) => {
  try {
    const { academicYear, semester } = req.query;
    const studentId = req.user.userId;
    
    // Get grades
    let gradeQuery = { student: studentId };
    if (academicYear) gradeQuery.academicYear = academicYear;
    if (semester) gradeQuery.semester = semester;
    
    const grades = await Grade.find(gradeQuery)
      .populate('subject', 'subjectName subjectCode credits maxMarks department');
    
    // Get enrollments
    let enrollmentQuery = { student: studentId };
    if (academicYear) enrollmentQuery.academicYear = academicYear;
    if (semester) enrollmentQuery.semester = semester;
    
    const enrollments = await Enrollment.find(enrollmentQuery)
      .populate('subject', 'subjectName subjectCode credits department');
    
    // Calculate performance metrics
    const performanceMetrics = calculatePerformanceMetrics(grades);
    
    // Calculate GPA
    const gpa = calculateGPA(grades);
    
    // Generate grade distribution
    const gradeDistribution = {};
    grades.forEach(grade => {
      gradeDistribution[grade.grade] = (gradeDistribution[grade.grade] || 0) + 1;
    });
    
    // Academic year and semester info
    const academicInfo = {
      academicYear: academicYear || 'All',
      semester: semester || 'All',
      reportGeneratedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        academicInfo,
        grades,
        enrollments,
        performance: {
          ...performanceMetrics,
          gpa: parseFloat(gpa)
        },
        gradeDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating academic report',
      error: error.message
    });
  }
};

// Get student's performance statistics
const getPerformanceStats = async (req, res) => {
  try {
    const { academicYear, semester } = req.query;
    const studentId = req.user.userId;
    
    let query = { student: studentId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const grades = await Grade.find(query)
      .populate('subject', 'credits maxMarks');
    
    const stats = calculatePerformanceMetrics(grades);
    const gpa = calculateGPA(grades);
    
    res.json({
      success: true,
      data: {
        ...stats,
        gpa: parseFloat(gpa)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching performance statistics',
      error: error.message
    });
  }
};

module.exports = {
  getStudentGrades,
  getEnrolledSubjects,
  getAcademicReport,
  getPerformanceStats
};