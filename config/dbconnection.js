const mongoose=require("mongoose");
const connectDb=async ()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("successfully conncected");
        console.log(connect.connection.host);
        console.log(connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit();
    }
}
module.exports=connectDb;