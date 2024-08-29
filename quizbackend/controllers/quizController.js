const Quiz = require('../models/questions');
const Course = require('../models/courses');
const Exam = require('../models/exam');


module.exports.createQuiz = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const { course, questions } = req.body;

    // Check if course exists
    const courseExists = await Course.findById(course);
    console.log('Course exists:', courseExists); // Debug log

    if (!courseExists) {
      return res.status(400).json({ message: 'Course does not exist' });
    }

    // Create quizzes
    const createdQuiz = await Quiz.insertMany(questions.map(question => ({
      ...question,
      course
    })));
    console.log('Created quiz:', createdQuiz); // Debug log

    res.status(201).json({ success: true, message: 'Quiz created successfully', quiz: createdQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  
  module.exports.getQuizzesByCourse = async (req, res, next) => {
    try {
      const courseName = req.params.courseName;

      const quizzes = await Quiz.find({}).populate({
        path: 'course',
        match: { name: courseName }
      });
  
      if (!quizzes) {
        return res.status(404).json({ message: 'No quizzes found for this course.' });
      }

      const filteredQuizzes = quizzes.filter(quiz => quiz.course !== null);
  
      res.status(200).json({ quizzes: filteredQuizzes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching quizzes.' });
    }
  };

  module.exports.submitQuiz = async (req, res, next) => {
    try {
      const { courseName } = req.params;
      const { selectedAnswers } = req.body;

      console.log('Quiz submitted:', req.body);
     
      const userId = req.cookies.userId;
      const userName = req.cookies.userName; 
      console.log(userId)
      console.log(userName)
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
  
      const course = await Course.findOne({ name: courseName });
      console.log("CourseId:",course._id)
      if (!course) {
        return res.status(404).json({ message: `Course ${courseName} not found.` });
      }
  
      const quizzes = await Quiz.find({ course: course._id });
      if (!quizzes || quizzes.length === 0) {
        return res.status(404).json({ message: 'No quizzes found for this course.' });
      }
  
      let score = 0;
      const totalScore = quizzes.length * 10;
      console.log("Total Score:", totalScore);

      quizzes.forEach((quiz) => {
        const selectedAnswerIndex = selectedAnswers[quiz._id]; 
        const selectedAns=quiz.options[selectedAnswerIndex]// Use the index directly
        const correctAnswerIndex = quiz.answer;
        console.log("Quiz ID:", quiz._id);
        console.log("Selected answer index:", selectedAns);
        console.log("Correct answer index:", correctAnswerIndex);
        if (selectedAns === correctAnswerIndex) {
            score=score+10;
        }
        console.log("Score:", score);
    });
  
      const exam = new Exam({ course: course.name, user: userName, score:score });
      await exam.save();
  
      res.status(201).json({ success:true,message: 'Quiz submitted successfully!', score, totalScore });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to submit quiz.' });
    }
  };
  // Update quiz
  // Assuming you have this in your backend controller
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  module.exports.getQuizEdit = async (req, res, next) => {
    try {
      const { quizId } = req.params;
      const quiz = await Quiz.findById(quizId);
      return res.status(200).json({ success: true, quiz });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while fetching the quizzes." });
    }
  };
// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, correctOption } = req.body;

    // Find the correct option index
    const correctOptionIndex = options.indexOf(correctOption);

    if (correctOptionIndex === -1) {
      return res.status(400).json({ message: 'Correct answer does not match any of the options.' });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { text, options, answer: correctOption },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    console.log("deleted quiz",deletedQuiz)
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};