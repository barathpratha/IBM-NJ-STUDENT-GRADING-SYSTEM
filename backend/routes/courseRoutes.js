const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByDepartment,
  enrollStudents,
  getCourseStudents
} = require('../controllers/courseController');
const { validateCourse } = require('../../shared/utils/validators');

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', getCourseById);

// POST /api/courses - Create new course
router.post('/', validateCourse, createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', validateCourse, updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', deleteCourse);

// GET /api/courses/department/:department/:year - Get courses by department and year
router.get('/department/:department/:year', getCoursesByDepartment);

// POST /api/courses/:courseId/enroll - Enroll students in course
router.post('/:courseId/enroll', enrollStudents);

// GET /api/courses/:courseId/students - Get students enrolled in course
router.get('/:courseId/students', getCourseStudents);

module.exports = router;
