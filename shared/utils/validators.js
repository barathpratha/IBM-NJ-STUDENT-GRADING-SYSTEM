const { body, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Student validation rules
 */
const validateStudent = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Student ID must be between 3 and 20 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('department')
    .notEmpty()
    .withMessage('Department is required'),
  
  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isIn(['1st Year', '2nd Year', '3rd Year', '4th Year'])
    .withMessage('Invalid year'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  
  handleValidationErrors
];

/**
 * Course validation rules
 */
const validateCourse = [
  body('courseCode')
    .notEmpty()
    .withMessage('Course code is required')
    .isLength({ min: 3, max: 10 })
    .withMessage('Course code must be between 3 and 10 characters'),
  
  body('courseName')
    .notEmpty()
    .withMessage('Course name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Course name must be between 3 and 100 characters'),
  
  body('credits')
    .isInt({ min: 1, max: 6 })
    .withMessage('Credits must be between 1 and 6'),
  
  body('maxMarks')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Max marks must be between 1 and 1000'),
  
  body('department')
    .notEmpty()
    .withMessage('Department is required'),
  
  handleValidationErrors
];

/**
 * Grade validation rules
 */
const validateGrade = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  
  body('courseId')
    .notEmpty()
    .withMessage('Course ID is required'),
  
  body('marks')
    .isInt({ min: 0, max: 100 })
    .withMessage('Marks must be between 0 and 100'),
  
  body('examType')
    .notEmpty()
    .withMessage('Exam type is required')
    .isIn(['Midterm', 'Final', 'Assignment', 'Quiz', 'Project'])
    .withMessage('Invalid exam type'),
  
  body('academicYear')
    .notEmpty()
    .withMessage('Academic year is required'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateStudent,
  validateCourse,
  validateGrade
};
