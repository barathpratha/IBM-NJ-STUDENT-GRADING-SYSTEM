const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  academicYear: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: String,
    required: true,
    trim: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure unique combination of student, course, academic year, and semester
studentCourseSchema.index({ 
  student: 1, 
  course: 1, 
  academicYear: 1, 
  semester: 1 
}, { unique: true });

module.exports = mongoose.model('StudentCourse', studentCourseSchema);
