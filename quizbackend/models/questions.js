const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, "Please provide a course for the exam"],
  },
  text: {
    type: String,
    required: [true, "Please provide a question text"],
  },
  options: [
    {
      text: {
        type: String,
        required: [true, "Please provide an option text"],
      },
      isCorrect: {
        type: Boolean,
        required: [true, "Please indicate if the option is correct"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Question', questionSchema);

// course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: [true, "Please provide a course for the exam"],
//   },