const mongoose = require('mongoose');
const { calculateGrade } = require('../../shared/config/constants');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  examType: {
    type: String,
    required: true,
    enum: ['Midterm', 'Final', 'Assignment', 'Quiz', 'Project']
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
  remarks: {
    type: String,
    trim: true
  },
  gradedBy: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate grade based on marks
gradeSchema.pre('save', function(next) {
  if (this.isModified('marks')) {
    const subject = this.subject;
    if (subject && subject.maxMarks) {
      const percentage = (this.marks / subject.maxMarks) * 100;
      this.grade = calculateGrade(percentage);
    }
  }
  next();
});

// Index for efficient queries
gradeSchema.index({ student: 1, subject: 1, academicYear: 1, semester: 1 });
gradeSchema.index({ academicYear: 1, semester: 1 });

module.exports = mongoose.model('Grade', gradeSchema);
