const express = require('express');
const router = express.Router();
const {
  getTeacherSubjects,
  getSubjectStudents,
  enterGrades,
  getSubjectGrades,
  updateGrade,
  deleteGrade
} = require('../controllers/teacherController');
const { authenticate, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

// All routes require authentication and teacher role
router.use(authenticate);
router.use(authorize('teacher', 'admin'));

// Teacher routes
router.get('/subjects', getTeacherSubjects);
router.get('/subjects/:subjectId/students', getSubjectStudents);
router.post('/grades', enterGrades);
router.get('/subjects/:subjectId/grades', getSubjectGrades);
router.put('/grades/:gradeId', updateGrade);
router.delete('/grades/:gradeId', deleteGrade);

module.exports = router;
