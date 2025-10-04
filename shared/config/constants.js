// Grade point mapping
const GRADE_POINTS = {
  'A+': 4.0,
  'A': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'C+': 2.7,
  'C': 2.3,
  'D': 2.0,
  'F': 0.0
};

// Grade calculation based on percentage
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

// Academic years
const ACADEMIC_YEARS = [
  '2020-21', '2021-22', '2022-23', '2023-24', '2024-25', '2025-26'
];

// Departments
const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Chemical',
  'Aerospace',
  'Biotechnology',
  'Management'
];

// Years
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

module.exports = {
  GRADE_POINTS,
  calculateGrade,
  ACADEMIC_YEARS,
  DEPARTMENTS,
  YEARS
};
