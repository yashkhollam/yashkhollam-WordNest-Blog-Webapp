

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../../model/userModel.js'





export const Login=async(req,res)=>{
    const{email,password}=req.body
   try{
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User does not exist!! Please SignUp"
        })
    }

    const ispasswordCorrect=await bcrypt.compare(password,user.password)
    if(!ispasswordCorrect){
        return res.status(401).json({
            success:false,
            message:"Password is incorrect!!Plese try again"
        })
    }
   const JWTSECRET=process.env.JWTSECRET;
    const jwtToken=jwt.sign({email:user.email,
        id:user._id,username:user.username},
         JWTSECRET,
         {expiresIn:"24h"}
    )


    res.cookie('jwtToken',jwtToken,{
        httpOnly:true,
        
         
        sameSite:"none",
        secure:true,

        maxAge:24*60*60*1000
    })

    
     return res.status(200).json({
        success:true,
        message:"Login Successfully",
        id:user._id,
        username:user.username,
       
        email:user.email
         
       
     })

    }
    catch(err){
        console.log(err)
          return res.status(500).json({
            success:false,
            message:err.message
         })
    }
}
