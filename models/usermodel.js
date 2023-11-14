const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter the user name"]
    },
    email:{
        type:String ,
        required:[true,"please enter the email address"],
        unique:[true,"this email address is already taken"]
    },
    password:{
        type:String ,
        required:[true,"please enter password"]
    },
},{
    timestamps:true}
)
module.exports=mongoose.model("User",userSchema)//name the model and export it users is a name