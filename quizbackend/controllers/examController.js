const Exam = require('../models/exam');
const Course = require('../models/courses');
const Quiz = require('../models/questions');
// module.exports.attendExam = async (req, res) => {
//   try {
//     const { course, user, score } = req.body;

//     const exam = new Exam({ course, user, score });
//     await exam.save();

//     res.status(201).json({ message: 'Exam attended successfully.', exam });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to attend exam.' });
//   }
// };

module.exports.getExamResults = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const exams = await Exam.find({ user: userId }).populate('course');

    res.status(201).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch exam results.' });
  }
};
module.exports.listScore = async (req, res) => {
  try {
    const userName = req.cookies.userName;
    console.log("username",userName)
    const exams = await Exam.find({ user: userName });

    const scores = [];
    for (const exam of exams) {
      // Find the course associated with the exam
      const course = await Course.findOne({ name: exam.course });
      // Count the number of questions in the course
      const totalQuestions = await Quiz.countDocuments({ course: course._id });
      // Calculate the total possible score
      const totalScore = totalQuestions * 10;

      scores.push({
        course: exam.course,
        score: exam.score,
        totalScore: totalScore,
        date: exam.date
      });
    }
    console.log("Scores:",scores)
    res.status(200).json({ exams,scores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch scores.' });
  }
};