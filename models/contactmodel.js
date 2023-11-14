const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
    name:{
        type:String,
        required:[true,"please enter a valid name"]
    },
    email:{
        type:String ,
        required:[true,"please enter the email address"]
    },
    phn:{
        type:String ,
        required:[true,"please enter Phn"]
    },
},{
    timestamp:true}
)
module.exports=mongoose.model("contacts",contactSchema)