import Task from "../model/Task.js"
import User from  "../model/User.js"

export const getTasks=async(req,res)=>{
    const loggedUser=req.user;
    const userPosts= await Task.find({user:loggedUser._id})
    res.status(200).json({userPosts})
}
export const postTasks=async(req,res)=>{
    const { description}=req.body
    const loggedUser=req.user;
    const newTask=new Task({user:loggedUser._id,description})
    const savedTask=await newTask.save();
    loggedUser.task.push(savedTask);
    await loggedUser.save()
 // const newUserlogge= await User.findByIdAndUpdate(loggedUser._id,{task:[savedTask._id,...task]})
   res.status(202). json({loggedUser,savedTask});
   // res.status(202).json({savedTask,newUser})
}
export const deleteTasks=async(req,res)=>{
    try{
    const task_id=req.params.id;
    const loggedUser=req.user;
  const task= await Task.findByIdAndDelete(task_id)

        
    if(!task){ return res.status(404).json({messege:"task not found"})}
      const user=await User.findOneAndUpdate({task:task_id},{$pull:{task:task_id}})
 // const newUserlogge= await User.findByIdAndUpdate(loggedUser._id,{task:[savedTask._id,...task]})
   res.status(202). json({user,task});
   // res.status(202).json({savedTask,newUser})
    }catch(err){res.status(400).json({messege:'not deleted'})}
}