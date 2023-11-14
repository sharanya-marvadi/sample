const express=require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/usercontrollers");
const validatetoken = require("../middleware/valisatetokenhandler");
const router=express.Router();
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validatetoken,currentUser);
module.exports=router;