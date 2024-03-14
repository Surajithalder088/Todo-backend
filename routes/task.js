import express from 'express'
import {getTasks,postTasks,deleteTasks}from '../controllers/task.js'
import{ auth} from "../controllers/auth.js"
const router=express.Router();
router.get("/tasks",auth,getTasks)
router.post("/posttasks",auth,postTasks)
router.delete("/deletetask/:id",auth,deleteTasks)
export default router;