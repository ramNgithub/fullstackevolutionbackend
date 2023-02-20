const express=require("express");
const { PostModel } = require("../models/Post.model");


const postRouter=express.Router()


postRouter.get("/",async (req,res)=>{
    try {
        const notes=await PostModel.find();
        res.send(notes)
    } catch (err) {
        res.send({"msg":"Somthing went wrong","error":err.message})
    }
})

postRouter.post("/create",async (req,res)=>{
    const payload=req.body;
    try {
        const notes=await PostModel(payload);
        await notes.save();
        res.send({"msg":"Notes has been created"})
       
    } catch (err) {
        res.send({"msg":"Somthing went wrong","error":err.message})
    }
})

postRouter.patch("/update/:id",async (req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userIDOfPost=note.userID;
    const userIDmakeReq=req.body.userID;

    try {
        if(userIDmakeReq!==userIDOfPost){
            res.send({"msg":"Not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

postRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userIDOfPost=note.userID;
    const userIDmakeReq=req.body.userID;

    try {
        if(userIDmakeReq!==userIDOfPost){
            res.send({"msg":"Not authorized"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

module.exports={
    postRouter
}