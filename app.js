import express from "express";
import mongoose from"mongoose";
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.js"
import taskRoute from './routes/task.js'
const url="mongodb+srv://surajithalder088:todoselfmade@cluster0.fmo2uof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const app=express();

mongoose.connect(url,{
    dbName:"todoselfmade"
}).
then(()=>{console.log('database connected');}).catch(()=>console.log("not connected"))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user',userRoute);
app.use('/api/v1/task',taskRoute);

app.listen(4000,()=>{console.log('server is running');})