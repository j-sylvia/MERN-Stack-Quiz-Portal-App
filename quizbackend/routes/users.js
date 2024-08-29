const {Signup,Login} = require('../controllers/authcontroller');
var express = require('express');
var router = express.Router();
var user=require('../models/users')
var {userVerification}=require('../middlewares/authmiddleware')
const { createCourse, getCourse,getCourseEdit,updateCourse, deleteCourse } = require('../controllers/courseController');
const { createQuiz,getCourseById,getQuizEdit,getQuizzesByCourse,submitQuiz,updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { listScore, getExamResults } = require('../controllers/examController');
const Course = require('../models/courses');
router.get('/',async function (req, res, next) {
  try {
    const users = await user.find(); 
    res.json(users); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Example of /users/profile route handler
router.get('/profile', async (req, res) => {
  try {
    const userId = req.cookies.userId; // Assuming user ID is stored in cookies
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in cookies' });
    }

    const users = await user.findById(userId); // Await the result of the query
    if (!users) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ userName: users.name,userAdmin:users.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('/create-course',function (req, res, next) {
//   res.send('Course');
// });
// router.get('/attend-exam',function (req, res, next) {

//   res.send('Exam');
// });

//protected routes
// router.use(userVerification);

//public routes
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/create-course', createCourse);
router.get('/get-course', getCourse);
router.post('/create-quiz', createQuiz);
router.get('/courses/:courseName/quizzes', getQuizzesByCourse);
router.get('/list-score', listScore);
router.get('/exam-results/:userId', getExamResults);
router.post('/courses/:courseName/quizzes/submit', submitQuiz);
// Add these routes for courses
router.get('/courses/:courseId', getCourseEdit);
router.put('/courses/:courseId', updateCourse);
router.delete('/courses/:courseId', deleteCourse);


router.get('/courses/:courseId', getCourseById);
router.get('/quizzes/:quizId', getQuizEdit);
router.put('/quizzes/:quizId', updateQuiz);
router.delete('/quizzes/:quizId', deleteQuiz);

module.exports = router;
