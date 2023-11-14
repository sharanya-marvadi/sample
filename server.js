const express=require("express");
const errorHandlers=require('./middleware/errorhandler');
const connectDb = require("./config/dbconnection");
const dotenv=require("dotenv").config();
connectDb();
const app=express();
const port=process.env.PORT||5001;
//this is uesd the the message from server to client
app.use(express.json()); 
//when ever we want to use middle ware we have to use app.use
app.use(errorHandlers)
app.use("/api/contacts",require("./routes/contactroutes"))
app.use("/api/users",require("./routes/userroutes"))
app.listen(port,()=>{
    console.log("the server is running on port"+port);
})