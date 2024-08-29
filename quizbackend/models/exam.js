const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  course: {
    type: String,
    ref: 'Course',
    required: true,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
