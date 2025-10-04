const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');
const { calculatePerformanceMetrics, calculateGPA } = require('../../shared/utils/gradeCalculator');

/**
 * Get all grades with optional filtering
 */
const getAllGrades = async (req, res) => {
  try {
    const { studentId, courseId, academicYear, semester, examType } = req.query;
    let query = {};
    
    if (studentId) query.student = studentId;
    if (courseId) query.course = courseId;
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    if (examType) query.examType = examType;
    
    const grades = await Grade.find(query)
      .populate('student', 'name studentId email department year')
      .populate('course', 'courseName courseCode credits maxMarks')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching grades',
      error: error.message
    });
  }
};

/**
 * Get grades by student ID
 */
const getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear, semester } = req.query;
    
    let query = { student: studentId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const grades = await Grade.find(query)
      .populate('course', 'courseName courseCode credits maxMarks department')
      .sort({ 'course.courseName': 1 });
    
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

/**
 * Create or update grade
 */
const createOrUpdateGrade = async (req, res) => {
  try {
    const { studentId, courseId, marks, examType, academicYear, semester, remarks, gradedBy } = req.body;
    
    // Check if student is enrolled in the course
    const enrollment = await StudentCourse.findOne({
      student: studentId,
      course: courseId,
      academicYear,
      semester
    });
    
    if (!enrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student is not enrolled in this course for the specified academic year and semester'
      });
    }
    
    // Check if grade already exists
    const existingGrade = await Grade.findOne({
      student: studentId,
      course: courseId,
      examType,
      academicYear,
      semester
    });
    
    let grade;
    if (existingGrade) {
      // Update existing grade
      existingGrade.marks = marks;
      existingGrade.remarks = remarks;
      existingGrade.gradedBy = gradedBy;
      await existingGrade.save();
      grade = existingGrade;
    } else {
      // Create new grade
      grade = new Grade({
        student: studentId,
        course: courseId,
        marks,
        examType,
        academicYear,
        semester,
        remarks,
        gradedBy
      });
      await grade.save();
    }
    
    // Populate the grade with student and course details
    await grade.populate('student', 'name studentId email');
    await grade.populate('course', 'courseName courseCode credits maxMarks');
    
    res.json({
      success: true,
      message: existingGrade ? 'Grade updated successfully' : 'Grade created successfully',
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating/updating grade',
      error: error.message
    });
  }
};

/**
 * Update grade
 */
const updateGrade = async (req, res) => {
  try {
    const { marks, remarks, gradedBy } = req.body;
    
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { marks, remarks, gradedBy },
      { new: true, runValidators: true }
    ).populate('student', 'name studentId email')
     .populate('course', 'courseName courseCode credits maxMarks');
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Grade updated successfully',
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating grade',
      error: error.message
    });
  }
};

/**
 * Delete grade
 */
const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Grade deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting grade',
      error: error.message
    });
  }
};

/**
 * Get grade statistics
 */
const getGradeStatistics = async (req, res) => {
  try {
    const { studentId, courseId, academicYear, semester } = req.query;
    let query = {};
    
    if (studentId) query.student = studentId;
    if (courseId) query.course = courseId;
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const grades = await Grade.find(query)
      .populate('course', 'credits maxMarks');
    
    const statistics = calculatePerformanceMetrics(grades);
    
    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching grade statistics',
      error: error.message
    });
  }
};

/**
 * Get class-wise performance
 */
const getClassPerformance = async (req, res) => {
  try {
    const { department, year, academicYear, semester } = req.params;
    
    // Get all students in the department and year
    const students = await Student.find({ department, year, isActive: true });
    const studentIds = students.map(s => s._id);
    
    // Get grades for these students
    let gradeQuery = { student: { $in: studentIds } };
    if (academicYear) gradeQuery.academicYear = academicYear;
    if (semester) gradeQuery.semester = semester;
    
    const grades = await Grade.find(gradeQuery)
      .populate('student', 'name studentId')
      .populate('course', 'courseName courseCode credits');
    
    // Calculate class statistics
    const classStats = {
      totalStudents: students.length,
      totalGrades: grades.length,
      averageMarks: 0,
      passRate: 0,
      gradeDistribution: {}
    };
    
    if (grades.length > 0) {
      const totalMarks = grades.reduce((sum, grade) => sum + grade.marks, 0);
      classStats.averageMarks = (totalMarks / grades.length).toFixed(2);
      
      const passedGrades = grades.filter(grade => grade.grade !== 'F').length;
      classStats.passRate = ((passedGrades / grades.length) * 100).toFixed(2);
      
      // Grade distribution
      grades.forEach(grade => {
        classStats.gradeDistribution[grade.grade] = 
          (classStats.gradeDistribution[grade.grade] || 0) + 1;
      });
    }
    
    res.json({
      success: true,
      data: {
        classInfo: { department, year, academicYear, semester },
        statistics: classStats,
        students: students.map(student => ({
          ...student.toObject(),
          grades: grades.filter(g => g.student._id.toString() === student._id.toString())
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching class performance',
      error: error.message
    });
  }
};

module.exports = {
  getAllGrades,
  getGradesByStudent,
  createOrUpdateGrade,
  updateGrade,
  deleteGrade,
  getGradeStatistics,
  getClassPerformance
};
