const User = require('../models/User');
const Subject = require('../models/Subject');
const Grade = require('../models/Grade');
const Enrollment = require('../models/Enrollment');
const { calculatePerformanceMetrics } = require('../../shared/utils/gradeCalculator');

// Get all users with filtering
const getAllUsers = async (req, res) => {
  try {
    const { role, department, year, isActive, search } = req.query;
    let query = {};
    
    if (role) query.role = role;
    if (department) query['profile.department'] = department;
    if (year) query['profile.year'] = year;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'profile.firstName': { $regex: search, $options: 'i' } },
        { 'profile.lastName': { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Create new user (admin only)
const createUser = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    const user = new User({
      username,
      email,
      password,
      role,
      profile
    });
    
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, role, profile, isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, role, profile, isActive },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const { department, year, isActive, search } = req.query;
    let query = {};
    
    if (department) query.department = department;
    if (year) query.year = year;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { subjectName: { $regex: search, $options: 'i' } },
        { subjectCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    const subjects = await Subject.find(query)
      .populate('teacher', 'username email profile.firstName profile.lastName')
      .sort({ subjectName: 1 });
    
    res.json({
      success: true,
      data: subjects,
      count: subjects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subjects',
      error: error.message
    });
  }
};

// Create new subject
const createSubject = async (req, res) => {
  try {
    const { subjectCode, subjectName, department, year, credits, maxMarks, passingMarks, teacher, description } = req.body;
    
    // Check if subject already exists
    const existingSubject = await Subject.findOne({ subjectCode });
    
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: 'Subject with this code already exists'
      });
    }
    
    const subject = new Subject({
      subjectCode,
      subjectName,
      department,
      year,
      credits,
      maxMarks,
      passingMarks,
      teacher,
      description
    });
    
    await subject.save();
    await subject.populate('teacher', 'username email profile.firstName profile.lastName');
    
    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subject',
      error: error.message
    });
  }
};

// Update subject
const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const updateData = req.body;
    
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      updateData,
      { new: true, runValidators: true }
    ).populate('teacher', 'username email profile.firstName profile.lastName');
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Subject updated successfully',
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating subject',
      error: error.message
    });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    
    const subject = await Subject.findByIdAndDelete(subjectId);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting subject',
      error: error.message
    });
  }
};

// Get system statistics
const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalSubjects = await Subject.countDocuments();
    const totalGrades = await Grade.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    
    // Department-wise statistics
    const departmentStats = await User.aggregate([
      { $match: { role: 'student' } },
      { $group: { _id: '$profile.department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Year-wise statistics
    const yearStats = await User.aggregate([
      { $match: { role: 'student' } },
      { $group: { _id: '$profile.year', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          teachers: totalTeachers,
          admins: totalAdmins
        },
        academic: {
          subjects: totalSubjects,
          grades: totalGrades,
          enrollments: totalEnrollments
        },
        departmentStats,
        yearStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching system statistics',
      error: error.message
    });
  }
};

// Get grade statistics
const getGradeStatistics = async (req, res) => {
  try {
    const { academicYear, semester, department, year } = req.query;
    
    let matchQuery = {};
    if (academicYear) matchQuery.academicYear = academicYear;
    if (semester) matchQuery.semester = semester;
    
    // Get grades with population
    const grades = await Grade.find(matchQuery)
      .populate('student', 'profile.department profile.year')
      .populate('subject', 'department year');
    
    // Filter by department and year if specified
    let filteredGrades = grades;
    if (department) {
      filteredGrades = filteredGrades.filter(grade => 
        grade.student.profile.department === department
      );
    }
    if (year) {
      filteredGrades = filteredGrades.filter(grade => 
        grade.student.profile.year === year
      );
    }
    
    // Calculate statistics
    const totalGrades = filteredGrades.length;
    const totalMarks = filteredGrades.reduce((sum, grade) => sum + grade.marks, 0);
    const averageMarks = totalGrades > 0 ? (totalMarks / totalGrades).toFixed(2) : 0;
    
    const gradeDistribution = {};
    filteredGrades.forEach(grade => {
      gradeDistribution[grade.grade] = (gradeDistribution[grade.grade] || 0) + 1;
    });
    
    const passedGrades = filteredGrades.filter(grade => grade.grade !== 'F').length;
    const passRate = totalGrades > 0 ? ((passedGrades / totalGrades) * 100).toFixed(2) : 0;
    
    res.json({
      success: true,
      data: {
        totalGrades,
        totalMarks,
        averageMarks: parseFloat(averageMarks),
        passedGrades,
        failedGrades: totalGrades - passedGrades,
        passRate: parseFloat(passRate),
        gradeDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching grade statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSystemStats,
  getGradeStatistics
};
