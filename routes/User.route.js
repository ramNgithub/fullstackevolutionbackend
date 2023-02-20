const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../models/User.model");
const jwt = require('jsonwebtoken');


const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {email,password,name,gender,age,city}=req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash)=> {
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({email,password:hash,name,gender,age,city})
                await user.save()
                res.send({"msg":"User Registered"})
            }
        });
        
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
        console.log(err)
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user =await UserModel.find({email})
        const hashPass=user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hashPass, (err, result)=> {
               if(result){
                const token = jwt.sign({ userID: user[0]._id }, 'masai');
                res.send({"msg":"Login Successfull","token":token})
               }else{
                res.send({"msg":"Wrong credential"})
               }
            });
        }else{
            res.send({"msg":"Wrong credential"})
        }
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
        console.log(err)
    }
})

module.exports={
    userRouter
}