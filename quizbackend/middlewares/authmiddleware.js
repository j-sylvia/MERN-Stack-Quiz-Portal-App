const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token
  console.log("Middleware Token Cookie:",req.cookies);
  console.log("Token:",token)
  if (!token) {
    return res.json({ status: false });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Decoded:",data)
    req.user=await User.findById(data.id).select('-password');
    const user = await User.findById(data.id);
    if (user) {
      console.log("Auth Middleware user.isAdmin", user.isAdmin);
      console.log(user)
      // Set the cookie 
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.cookie("userId", user.id, {httpOnly: true, withCredentials: true });
      res.cookie("userName", user.name, {httpOnly: true, withCredentials: true });
      res.cookie("role", user.isAdmin, {httpOnly: true, withCredentials: true });
      console.log("Auth controller", user.isAdmin);
      return res.json({ status: true, data:req.user,user:user.name, isAdmin: user.isAdmin,role:user.isAdmin });
    } else {
      return res.json({ status: false,message:"User not found" });
    }
  } catch (err) {
    return res.json({ status: false, message:"authmiddleware catch" });
  }
};
