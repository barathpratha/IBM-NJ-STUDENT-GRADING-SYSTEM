const { GRADE_POINTS, calculateGrade } = require('../config/constants');

/**
 * Calculate GPA from grades array
 * @param {Array} grades - Array of grade objects with grade and credits
 * @returns {number} GPA value
 */
const calculateGPA = (grades) => {
  if (!grades || grades.length === 0) return 0;
  
  let totalCredits = 0;
  let weightedSum = 0;
  
  grades.forEach(grade => {
    const credits = grade.credits || 1;
    const gradePoint = GRADE_POINTS[grade.grade] || 0;
    
    totalCredits += credits;
    weightedSum += (gradePoint * credits);
  });
  
  return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
};

/**
 * Calculate percentage from marks
 * @param {number} marks - Obtained marks
 * @param {number} maxMarks - Maximum marks
 * @returns {number} Percentage
 */
const calculatePercentage = (marks, maxMarks) => {
  if (maxMarks === 0) return 0;
  return ((marks / maxMarks) * 100).toFixed(2);
};

/**
 * Calculate overall performance metrics
 * @param {Array} grades - Array of grade objects
 * @returns {Object} Performance metrics
 */
const calculatePerformanceMetrics = (grades) => {
  if (!grades || grades.length === 0) {
    return {
      totalSubjects: 0,
      totalMarks: 0,
      averageMarks: 0,
      gpa: 0,
      passedSubjects: 0,
      failedSubjects: 0,
      passPercentage: 0
    };
  }
  
  const totalSubjects = grades.length;
  const totalMarks = grades.reduce((sum, grade) => sum + (grade.marks || 0), 0);
  const averageMarks = totalSubjects > 0 ? (totalMarks / totalSubjects).toFixed(2) : 0;
  const gpa = calculateGPA(grades);
  
  const passedSubjects = grades.filter(grade => grade.grade !== 'F').length;
  const failedSubjects = totalSubjects - passedSubjects;
  const passPercentage = totalSubjects > 0 ? ((passedSubjects / totalSubjects) * 100).toFixed(2) : 0;
  
  return {
    totalSubjects,
    totalMarks,
    averageMarks: parseFloat(averageMarks),
    gpa: parseFloat(gpa),
    passedSubjects,
    failedSubjects,
    passPercentage: parseFloat(passPercentage)
  };
};

/**
 * Generate grade distribution
 * @param {Array} grades - Array of grade objects
 * @returns {Object} Grade distribution
 */
const generateGradeDistribution = (grades) => {
  const distribution = {};
  
  grades.forEach(grade => {
    distribution[grade.grade] = (distribution[grade.grade] || 0) + 1;
  });
  
  return distribution;
};

module.exports = {
  calculateGPA,
  calculatePercentage,
  calculatePerformanceMetrics,
  generateGradeDistribution
};
