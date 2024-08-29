const User = require("../models/users");
const Course = require("../models/courses")
const Quiz=require("../models/questions")
const Exam = require('../models/exam');
const {createSecretToken}=require('../util/secrettoken')
const bcrypt = require("bcrypt");
const { Types } = require('mongoose');

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
        .json({message: "User created successfully", success:true, user});
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
        console.log("userId:",user._id)
        if(!user){
            return res.json({message:"User does not exist"});
        }
        const auth=await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({message:"Invalid credentials"});
        }
        if (user.isAdmin) {
            const token = createSecretToken(user._id);
            console.log("Token:",token)
            console.log("Token Cookie",req.cookies);
            // res.setHeader("Authorization",`Bearer ${token}`);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.cookie("userId", user.id, { withCredentials: true });
            res.cookie("userName", user.name, { withCredentials: true });
            res.cookie("role", user.isAdmin, { withCredentials: true });
            console.log("Auth controller",user.isAdmin)
            return res.status(201).json({message: "User logged in successfully", success: true, user,token,id:user._id,name:user.name,role:user.isAdmin});
            // return res.redirect('/users/create-course');
        } else {
            const token = createSecretToken(user._id);
            console.log("Token:",token)
            console.log("Token Cookie",req.cookies);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            console.log("Auth controller",user.isAdmin)
            console.log("Auth controller",user.email)
            return res.status(201).json({message: "User logged in successfully", success: true, user,token,id:user._id,name:user.name,role:user.isAdmin});
            // return res.redirect('/users/attend-exam');
        }   
    } catch(error){
        console.error(error);
        return res.status(500).json({message:"Invalid Authentication"});
    }
}

