const express = require('express');
const router = express.Router();
const {
  getStudentGrades,
  getEnrolledSubjects,
  getAcademicReport,
  getPerformanceStats
} = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication and student role
router.use(authenticate);
router.use(authorize('student'));

// Student routes
router.get('/grades', getStudentGrades);
router.get('/subjects', getEnrolledSubjects);
router.get('/report', getAcademicReport);
router.get('/performance', getPerformanceStats);

module.exports = router;