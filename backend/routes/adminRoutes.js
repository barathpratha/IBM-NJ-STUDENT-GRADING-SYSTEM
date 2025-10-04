const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// User management routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

// Subject management routes
router.get('/subjects', getAllSubjects);
router.post('/subjects', createSubject);
router.put('/subjects/:subjectId', updateSubject);
router.delete('/subjects/:subjectId', deleteSubject);

// Statistics and reports
router.get('/stats', getSystemStats);
router.get('/grade-stats', getGradeStatistics);

module.exports = router;
