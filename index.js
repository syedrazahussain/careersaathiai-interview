import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import interviewRouter from "./routes/interview.route.js";




dotenv.config()
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 6003


app.get('/',(req,res)=>{
    res.send("hello from interview service");
})

app.use("/",interviewRouter)





app.listen(PORT,()=>{
    console.log(`Interview service is running at port ${PORT}`)
    connectDB()
})