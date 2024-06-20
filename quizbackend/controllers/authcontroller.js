const User = require("../models/users");
const Course = require("../models/courses")
const Quiz=require("../models/questions")
const {createSecretToken}=require('../util/secrettoken')
const bcrypt = require("bcrypt");

module.exports.Signup=async (req,res,next)=>{
    try{
        const {name,password,email,phone,createdAt}=req.body;
        const existingUser=await User.findOne({email});
        if(!name || !email || !password){
            return res.json({message:"Please provide name, email and password"});
        }
        if(existingUser){
            return res.json({message:"User already exists"});
        }
        else{
        const user=await User.create({name,email,password,phone,isAdmin:false,createdAt});
    //     const token=createSecretToken(user._id);
    //     res.cookie("token", token, {
    //         withCredentials: true,
    //         httpOnly:false,
    // });
    res
        .status(201)
        .json({message: "User signed in successfully", success:true, user});
        next();
    }
} catch(error){
    console.error(error);
}
};

module.exports.Login=async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({message:"Please provide email and password"});
        }
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.json({message:"User does not exist"});
        }
        const auth=await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({message:"Invalid credentials"});
        }
        if (user.isAdmin) {
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            console.log("Auth controller",user.isAdmin)
            return res.status(201).json({message: "User logged in successfully", success: true, user,token});
            // return res.redirect('/users/create-course');
        } else {
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            console.log("Auth controller",user.isAdmin)
            return res.status(201).json({message: "User logged in successfully", success: true, user,token});
            // return res.redirect('/users/attend-exam');
        }   
    } catch(error){
        console.error(error);
        return res.status(500).json({message:"Invalid Authentication"});
    }
}

module.exports.Course=async (req,res,next)=>{
    try{
        const {name,description,createdAt}=req.body;
        const existingCourse=await Course.findOne({name});
        if(!name || !description){
            return res.json({message:"Please provide name and description"});
        }
        if(existingCourse){
            return res.json({message:"Course already exists"});
        }
        else{
        const course=await Course.create({name,description,createdAt});
    //     const token=createSecretToken(course._id);
    //     res.cookie("token", token, {
    //         withCredentials: true,
    //         httpOnly:false,
    // });
    res
        .status(201)
        .json({message: "Course created successfully", success:true, course});
        next();
    }
} catch(error){
    console.error(error);
}
};

module.exports.Quiz = async (req, res, next) => {
    try {
      const { course, text, options } = req.body;
  
      // Check if the user provided necessary information
      if (!course || !text || !options) {
        return res.status(400).json({ message: "Please provide course, text, and options for the question." });
      }
  
      const coursename = await Course.findOne({ name: course });

    if (!coursename) {
      return res.status(400).json({ error: `Course with name ${course} not found` });
    }

      // Create a new question document
      const newQuestion = await Quiz.create({
        course,
        text,
        options
      });
  
      return res.status(201).json({
        message: "Question created successfully",
        success: true,
        question: newQuestion
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while creating the question." });
    }
  };