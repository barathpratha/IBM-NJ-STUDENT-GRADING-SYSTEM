const Grade = require('../models/Grade');
const Subject = require('../models/Subject');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const { calculatePerformanceMetrics } = require('../../shared/utils/gradeCalculator');

// Get subjects taught by teacher
const getTeacherSubjects = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { academicYear, semester } = req.query;
    
    let query = { teacher: teacherId, isActive: true };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const subjects = await Subject.find({ teacher: teacherId, isActive: true })
      .sort({ subjectName: 1 });
    
    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher subjects',
      error: error.message
    });
  }
};

// Get students enrolled in a subject
const getSubjectStudents = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { academicYear, semester } = req.query;
    
    let query = { subject: subjectId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const enrollments = await Enrollment.find(query)
      .populate('student', 'username email profile.firstName profile.lastName profile.studentId')
      .sort({ 'student.profile.firstName': 1 });
    
    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subject students',
      error: error.message
    });
  }
};

// Enter/update grades for students
const enterGrades = async (req, res) => {
  try {
    const { grades } = req.body; // Array of { studentId, subjectId, marks, examType, academicYear, semester, remarks }
    
    const results = [];
    
    for (const gradeData of grades) {
      const { studentId, subjectId, marks, examType, academicYear, semester, remarks } = gradeData;
      
      // Check if student is enrolled in the subject
      const enrollment = await Enrollment.findOne({
        student: studentId,
        subject: subjectId,
        academicYear,
        semester
      });
      
      if (!enrollment) {
        results.push({
          studentId,
          subjectId,
          success: false,
          message: 'Student is not enrolled in this subject'
        });
        continue;
      }
      
      // Check if grade already exists
      const existingGrade = await Grade.findOne({
        student: studentId,
        subject: subjectId,
        examType,
        academicYear,
        semester
      });
      
      let grade;
      if (existingGrade) {
        // Update existing grade
        existingGrade.marks = marks;
        existingGrade.remarks = remarks;
        existingGrade.gradedBy = req.user.userId;
        await existingGrade.save();
        grade = existingGrade;
      } else {
        // Create new grade
        grade = new Grade({
          student: studentId,
          subject: subjectId,
          marks,
          examType,
          academicYear,
          semester,
          remarks,
          gradedBy: req.user.userId
        });
        await grade.save();
      }
      
      await grade.populate('student', 'username email profile.firstName profile.lastName');
      await grade.populate('subject', 'subjectName subjectCode');
      
      results.push({
        studentId,
        subjectId,
        success: true,
        data: grade
      });
    }
    
    res.json({
      success: true,
      message: 'Grades processed successfully',
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error entering grades',
      error: error.message
    });
  }
};

// Get grades for a specific subject
const getSubjectGrades = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { academicYear, semester, examType } = req.query;
    
    let query = { subject: subjectId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    if (examType) query.examType = examType;
    
    const grades = await Grade.find(query)
      .populate('student', 'username email profile.firstName profile.lastName profile.studentId')
      .populate('subject', 'subjectName subjectCode credits maxMarks')
      .sort({ 'student.profile.firstName': 1 });
    
    // Calculate subject statistics
    const totalStudents = grades.length;
    const totalMarks = grades.reduce((sum, grade) => sum + grade.marks, 0);
    const averageMarks = totalStudents > 0 ? (totalMarks / totalStudents).toFixed(2) : 0;
    
    const gradeDistribution = {};
    grades.forEach(grade => {
      gradeDistribution[grade.grade] = (gradeDistribution[grade.grade] || 0) + 1;
    });
    
    const passedStudents = grades.filter(grade => grade.grade !== 'F').length;
    const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) : 0;
    
    res.json({
      success: true,
      data: {
        grades,
        statistics: {
          totalStudents,
          totalMarks,
          averageMarks: parseFloat(averageMarks),
          passedStudents,
          failedStudents: totalStudents - passedStudents,
          passRate: parseFloat(passRate),
          gradeDistribution
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subject grades',
      error: error.message
    });
  }
};

// Update a specific grade
const updateGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { marks, remarks } = req.body;
    
    const grade = await Grade.findByIdAndUpdate(
      gradeId,
      { marks, remarks, gradedBy: req.user.userId },
      { new: true, runValidators: true }
    )
    .populate('student', 'username email profile.firstName profile.lastName')
    .populate('subject', 'subjectName subjectCode');
    
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

// Delete a grade
const deleteGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    
    const grade = await Grade.findByIdAndDelete(gradeId);
    
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

module.exports = {
  getTeacherSubjects,
  getSubjectStudents,
  enterGrades,
  getSubjectGrades,
  updateGrade,
  deleteGrade
};
