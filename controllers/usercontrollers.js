const User=require('../models/usermodel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//register a user ,public,post
const asyncHandler=require("express-async-handler");
const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username|| !email|| !password){
        res.status(400);
        throw new Error("all feilds are mandetory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("this mail is already used")
    }
    //res.json({message:"register a user"})
    //hash password
    const hashPassword=await bcrypt.hash(password,10);
    console.log("Hashed password  "+hashPassword);
    const user=await User.create({
        username,email,password:hashPassword
    })
   console.log(`user is creacted ${user}`);
   if(user){
    res.status(201);
   res.json({username:user.username,email:user.email})
   }
   else{
    res.status(400);
    res.json.stringify({message:"user data is not valid"})
   }
})
//login a user,post,private
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
       throw new Error("all feilds are required")
    }
    const user=await User.findOne({email})
    //comapre the password with the stored password in the db
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200);
        const accesstoken=jwt.sign({
            user:{
                username:user.name,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        res.json({accesstoken})
    }
    else{
        res.status(401);
        throw new Error("email or password not valid")
    }
    //res.json({message:"login a user"})
})

const currentUser=asyncHandler(async (req,res)=>{
    res.json(req.user)
})
module.exports={registerUser,loginUser,currentUser}