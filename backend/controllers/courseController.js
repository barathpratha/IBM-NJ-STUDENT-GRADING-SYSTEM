const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');

/**
 * Get all courses with optional filtering
 */
const getAllCourses = async (req, res) => {
  try {
    const { department, year, isActive, search } = req.query;
    let query = {};
    
    if (department) query.department = department;
    if (year) query.year = year;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { courseName: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    const courses = await Course.find(query)
      .sort({ courseCode: 1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

/**
 * Get course by ID
 */
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

/**
 * Create new course
 */
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this code already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

/**
 * Update course
 */
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

/**
 * Delete course
 */
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};

/**
 * Get courses by department and year
 */
const getCoursesByDepartment = async (req, res) => {
  try {
    const { department, year } = req.params;
    
    const courses = await Course.find({ 
      department, 
      year,
      isActive: true 
    }).sort({ courseCode: 1 });
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

/**
 * Enroll students in a course
 */
const enrollStudents = async (req, res) => {
  try {
    const { courseId, studentIds, academicYear, semester } = req.body;
    
    if (!courseId || !studentIds || !academicYear || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Course ID, student IDs, academic year, and semester are required'
      });
    }
    
    const enrollments = [];
    
    for (const studentId of studentIds) {
      try {
        const enrollment = new StudentCourse({
          student: studentId,
          course: courseId,
          academicYear,
          semester
        });
        await enrollment.save();
        enrollments.push(enrollment);
      } catch (error) {
        if (error.code !== 11000) { // Ignore duplicate key errors
          throw error;
        }
      }
    }
    
    res.json({
      success: true,
      message: 'Students enrolled successfully',
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling students',
      error: error.message
    });
  }
};

/**
 * Get students enrolled in a course
 */
const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { academicYear, semester } = req.query;
    
    let query = { course: courseId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;
    
    const enrollments = await StudentCourse.find(query)
      .populate('student', 'name studentId email department year')
      .populate('course', 'courseName courseCode credits')
      .sort({ 'student.studentId': 1 });
    
    res.json({
      success: true,
      data: enrollments,
      count: enrollments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course students',
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByDepartment,
  enrollStudents,
  getCourseStudents
};
