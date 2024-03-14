import jwt from "jsonwebtoken"
import User from"../model/User.js"
const jwt_token="gxs6ye37ged7e4eydh"
export const auth=async(req,res,next)=>{
    try{
   const {token}= req.cookies;
   if(!token) {
    return res.status(404).json({messege:' login first'})
   }
   const Id=jwt.verify(token,jwt_token)
   const user_id=Id.userId;
   console.log(user_id);
  req.user=await User.findOne({_id:user_id})
  next();
    }catch(err){res.status(404).json({messege:"unable to get user at cookies"})}

}