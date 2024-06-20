const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification=(req,res,next)=>{
    const token=req.cookies.token
    if (!token){
        return res.json({status:false})
    }
    jwt.verify(token,process.env.TOKEN_KEY,async (err,data)=>{
        if (err){
            return res.json({status:false})
        }
        else{
            const user = await User.findById(data.id);
            if (user){
                console.log("Auth Middleware",user.isAdmin)
                return res.json({status:true,user:user.name,isAdmin:user.isAdmin})
            }
            else{
                return res.json({status:false})
            }
        }
    })
}