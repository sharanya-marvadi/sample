//error file is in html formate to convert that to json file
const constants=require("./constants")
const errorHandlers=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Error",
                message:err.message,
                //stack:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"not found",
                message:err.message,
                //stack:err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"forbidden",
                message:err.message,
                //stack:err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title:"server error",
                message:err.message,
                //stack:err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"unauthorized",
                message:err.message,
               // stack:err.stack
            });
            break;
        default:
            console.log("All good,no errors ");
    }
}
module.exports=errorHandlers;