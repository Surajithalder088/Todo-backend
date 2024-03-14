import mongoose from "mongoose"

const taskschema=  new mongoose.Schema({
    description:{type:String,
                require:true,
    },
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Task= mongoose.model("Task",taskschema);
export default Task;