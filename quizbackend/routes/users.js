const {Signup,Login,Course,Quiz} = require('../controllers/authcontroller');
var express = require('express');
var router = express.Router();
var user=require('../models/users')

router.get('/',async function (req, res, next) {
  try {
    const users = await user.find(); // Fetch all users from the database
    res.json(users); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get('/create-course',function (req, res, next) {
  res.send('Course');
});
router.get('/attend-exam',function (req, res, next) {

  res.send('Exam');
});

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/create-course', Course);
router.post('/create-quiz', Quiz);

module.exports = router;
