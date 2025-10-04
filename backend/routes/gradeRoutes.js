const express = require('express');
const router = express.Router();
const {
  getAllGrades,
  getGradesByStudent,
  createOrUpdateGrade,
  updateGrade,
  deleteGrade,
  getGradeStatistics,
  getClassPerformance
} = require('../controllers/gradeController');
const { validateGrade } = require('../../shared/utils/validators');

// GET /api/grades - Get all grades
router.get('/', getAllGrades);

// GET /api/grades/statistics - Get grade statistics
router.get('/statistics', getGradeStatistics);

// GET /api/grades/student/:studentId - Get grades by student
router.get('/student/:studentId', getGradesByStudent);

// POST /api/grades - Create or update grade
router.post('/', validateGrade, createOrUpdateGrade);

// PUT /api/grades/:id - Update grade
router.put('/:id', validateGrade, updateGrade);

// DELETE /api/grades/:id - Delete grade
router.delete('/:id', deleteGrade);

// GET /api/grades/class/:department/:year/:academicYear/:semester - Get class performance
router.get('/class/:department/:year/:academicYear/:semester', getClassPerformance);

module.exports = router;
