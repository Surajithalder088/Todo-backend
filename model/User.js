import mongoose from"mongoose";

const userSchema= new mongoose.Schema({
    name:{
type:String,
require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
     },
    password:{
         type:String,
         require:true,
     },
     task:[{
      type:mongoose.Schema.Types.ObjectId,
     ref:"Task",
     }              
     ],
                 createdAt: {
                        type:Date,
                        default:Date.now()
                  }

})
const User=mongoose.model('User',userSchema)
export default User ;