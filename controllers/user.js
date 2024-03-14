import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from '../model/User.js'
const jwt_token="gxs6ye37ged7e4eydh"
export const  signup = async(req,res  )=>{
    try{
    const {name,email,password}=req.body;
    let existuser= await User.findOne({email:email})
    if(existuser){
            res.status(404).json({messege:"user already exists"})
            return;
    }
    const hashPassword=await bcrypt.hash(password,10)
 const user = new User({name,email,password:hashPassword})
 const savedUser=await user.save()
 const token= jwt.sign({userId:savedUser._id},jwt_token)
 res.cookie('token',token,{httpOnly:true})
res.status(201).json(savedUser)
    }catch(err){
        res.status(400).json('user not created')
    }

}
export const login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    let existuser=await User.findOne({email:email})

    if(!existuser){
        res.status(404).json({messege:"user not exist"})
        return;
    }
    const match =await bcrypt.compare(password,existuser.password)

    if(!match){
       return res.status(400).json({messege:" user not exist"})
    }

const token=jwt.sign({userId:existuser._id},jwt_token)

res.cookie('token',token,{httpOnly:true})
res.status(200).json({messege:"login suceesfully"})
}catch(err){res.status(404).json({messege:"unable to login"})}

}
 export const logout =async(req,res)=>{
    res.status(200).cookie("token",'',{expires:new Date(Date.now())}).json({messege:"logout succesful"})
 }
export const profile =async(req,res)=>{
    res.status(200).json({user:req.user})
 }
 
export const getusers=async(req,res)=>{
    try{
    const users=await User.find({})
    res.status(200).json(users)
    }catch(err){res.status(404).json("users not fing")}
}

