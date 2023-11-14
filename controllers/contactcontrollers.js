//when ever we interact with mangodb it will always gives you a promise inorder to resolve this we use async and await
//we are using async inorder to catch the arrors we have to use try catch block we have write this in every 
const Contact=require('../models/contactmodel')
const asyncHandler=require("express-async-handler");
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)});

const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw  new Error("not found")
    }
    res.status(200).json(contact)});

const createContact=asyncHandler(async(req,res)=>{
    console.log("request body is   "+JSON.stringify(req.body));
    const {name,email,phn}=req.body;
    if(!name || !email || !phn){
        res.status(400);
        throw new Error("all feilds are mandetory")
    }
    const contact=await Contact.create({name,email,phn,user_id:req.user.id})
    res.status(200).json(contact)});


const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user does not have permission to update the contact")
    }
    const updatecontact=Contact.findByIdUpdate(res.params.id,res.body,{new:true});
    res.status(200).json(updatecontact)});

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user does not have permission to delete the contact")
    }
    await Contact.deleteOne({_id:req.params.id });
    res.status(200).json(contact)});


module.exports={getContact,getContacts,createContact,updateContact,deleteContact}
