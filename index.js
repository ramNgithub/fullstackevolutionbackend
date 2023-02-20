const express=require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./middleware/authenticate.middleware");
const { postRouter } = require("./routes/Post.route");
const { userRouter } = require("./routes/User.route");
require("dotenv").config()


const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log("Unable to connect db")
        console.log(err)
    }
    console.log(`Running at port ${process.env.port}`)
})