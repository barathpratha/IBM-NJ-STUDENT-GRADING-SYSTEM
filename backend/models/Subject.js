const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  subjectName: {
    type: String,
    required: true,
    trim: true
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
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100
  },
  passingMarks: {
    type: Number,
    required: true,
    default: 33
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
subjectSchema.index({ subjectCode: 1 });
subjectSchema.index({ department: 1, year: 1 });
subjectSchema.index({ teacher: 1 });

module.exports = mongoose.model('Subject', subjectSchema);
