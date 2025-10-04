const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    minlength: 3,
    maxlength: 10
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  maxMarks: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
    default: 100
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
courseSchema.index({ courseCode: 1 });
courseSchema.index({ department: 1, year: 1 });

module.exports = mongoose.model('Course', courseSchema);
